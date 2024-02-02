const DynamicBackground = () => {
  return (
    <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80" className="fixed w-screen opacity-50 -z-10 blur-md">
    <defs>
      <style>
        {
          "@keyframes rotate{0%{transform:rotate(0deg)}to{transform:rotate(360deg)}}"
        }
      </style>
    </defs>
    <path
      fill="#030637"
      d="M37-5C25.1-14.7 5.7-19.1-9.2-10-28.5 1.8-32.7 31.1-19.8 49c15.5 21.5 52.6 22 67.2 2.3C59.4 35 53.7 8.5 37-5z"
      style={{
        animation: "rotate 20s linear infinite",
        transformOrigin: "13px 25px"
      }}
    />
    <path
      fill="#3C0753"
      d="M20.6 4.1C11.6 1.5-1.9 2.5-8 11.2-16.3 23.1-8.2 45.6 7.4 50S42.1 38.9 41 24.5C40.2 14.1 29.4 6.6 20.6 4.1z"
      style={{
        animation: "rotate 10s linear infinite",
        transformOrigin: "13px 25px"
      }}
    />
    <path
      fill="#720455"
      d="M105.9 48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4 12.8-37.7 51.9-19.1 74.1s63.9 15.3 76-5.6c7.6-13.3 1.8-31.1-2.3-43.8-3.5-10.8-6.4-19.8-15.2-25.5z"
      style={{
        animation: "rotate 25s linear infinite",
        transformOrigin: "84px 93px"
      }}
    />
    <path
      fill="#910A67"
      d="M102 67.1c-9.6-6.1-22-3.1-29.5 2-15.4 10.7-19.6 37.5-7.6 47.8s35.9 3.9 44.5-12.5c6.1-11.8 4.5-29.8-7.4-37.3z"
      style={{
        animation: "rotate 15s linear infinite",
        transformOrigin: "84px 93px"
      }}
    />
  </svg>
  )
}

export default DynamicBackground