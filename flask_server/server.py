from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import requests
from transformers import pipeline
import tensorflow_hub as hub
import numpy as np
import tensorflow as tf
import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

load_dotenv()

API_KEY = os.getenv("API_KEY")
OCR_KEY = os.getenc("OCR_KEY")

app = Flask(__name__)

# Load Universal Sentence Encoder model
model_emb = hub.load("https://tfhub.dev/google/universal-sentence-encoder/4")

# Define the embed function
@tf.function
def embed(input):
    return model_emb([input])

# Define the cosine similarity function
def cosine_sim(s1, s2):
    tensor1 = embed(s1) 
    tensor2 = embed(s2)
    tensor1 = torch.from_numpy(tensor1.numpy()[0])
    tensor2 = torch.from_numpy(tensor2.numpy()[0])
    tensor1 = tensor1.unsqueeze(0)
    tensor2 = tensor2.unsqueeze(0)
    cosine_similarity = F.cosine_similarity(tensor1, tensor2)
    return cosine_similarity.item()

# Load T5 Paraphrasing model
tokenizer = AutoTokenizer.from_pretrained("Vamsi/T5_Paraphrase_Paws")  
model = AutoModelForSeq2SeqLM.from_pretrained("Vamsi/T5_Paraphrase_Paws")

@app.route('/mark_answer', methods=['POST'])
def compute_cosine_similarity():
    data = request.get_json()

    teachers_ans = data.get('teachers_ans', '')
    students_ans = data.get('students_ans', '')
    min_marks = data.get('min_marks', 0)
    max_marks = data.get('max_marks', 100)

    text = "paraphrase: " + teachers_ans + " </s>"
    encoding = tokenizer.encode_plus(text, pad_to_max_length=True, return_tensors="pt")
    input_ids = encoding["input_ids"]
    attention_masks = encoding["attention_mask"]

    outputs = model.generate(
        input_ids=input_ids, attention_mask=attention_masks,
        max_length=256,
        do_sample=True,
        top_k=120,
        top_p=0.95,
        early_stopping=True,
        num_return_sequences=5
    )

    max_sim = 0.0
    for output in outputs:
        line = tokenizer.decode(output, skip_special_tokens=True, clean_up_tokenization_spaces=True)
        similarity = max(cosine_sim(line, students_ans), max_sim)

    marks = min(max(max_sim * max_marks, min_marks), max_marks)
    result = {
        "marks": marks
    }
    return jsonify(result)

@app.route('/check_plag', methods=['POST'])
def check_plag():
    # Get input text from the request
    input_text = request.json.get('input_text', '')

    # Use the Hugging Face pipeline for text classification
    pipe = pipeline("text-classification", model="roberta-base-openai-detector")
    classification_result = pipe(input_text)
    classification_label = classification_result[0]["label"]
    classification_score = classification_result[0]["score"]
    if classification_label == "Real":
        result = classification_score
    else:
        result = 1 - classification_score

    # API_URL and headers
    API_URL = "https://api-inference.huggingface.co/models/jpwahle/longformer-base-plagiarism-detection"
    headers = {"Authorization": f"Bearer {API_KEY}"}

    # Query the plagiarism detection model
    payload = {"inputs": input_text}
    response = requests.post(API_URL, headers=headers, json=payload)
    plagiarism_result = response.json()

    # Combine classification and plagiarism results
    result = {
        "AI_Gen": result,
        "Plagiarised": plagiarism_result[0][0]["score"]
    }

    return jsonify(result)
# OCR function using Google Cloud Vision API
def perform_ocr_with_api_key(image_url):
    # Fetch the image from the URL
    response = requests.get(image_url)
    
    if response.status_code == 200:
        # Encode the image as base64
        encoded_image = base64.b64encode(response.content).decode('utf-8')

        # Google Cloud Vision API endpoint
        endpoint = 'https://vision.googleapis.com/v1/images:annotate?key=' + OCR_KEY

        # Request payload
        request_data = {
            'requests': [
                {
                    'image': {'content': encoded_image},
                    'features': [{'type': 'TEXT_DETECTION'}],
                }
            ]
        }

        # Make a POST request to the API
        response = requests.post(endpoint, json=request_data)

        # Parse the response
        if response.status_code == 200:
            result = response.json()
            if 'textAnnotations' in result['responses'][0]:
                print("Detected Text:")
                return result['responses'][0]['textAnnotations'][0]['description']
            else:
                print("No text detected.")
        else:
            print(f"Error: {response.status_code}, {response.text}")
            print(response.json())
    else:
        print(f"Error fetching image from URL: {response.status_code}")

@app.route('/ocr', methods=['POST'])
def ocr_endpoint():
    data = request.get_json()

    # Get the image URL from the request
    image_url = data.get('image_url', '')

    # Perform OCR on the image
    ocr_result = perform_ocr_with_api_key(image_url)

    result = {
        "ocr_result": ocr_result
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run()
