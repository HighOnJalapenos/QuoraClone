const ThreeDotsLoading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
    >
      <circle cx="30" cy="20" r="0" fill="rgb(99, 100, 102)">
        <animate
          attributeName="r"
          begin=".67"
          calcMode="spline"
          dur="1.5s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;4;0;0"
        />
      </circle>
      <circle cx="20" cy="20" r="0" fill="rgb(99, 100, 102)">
        <animate
          attributeName="r"
          begin=".33"
          calcMode="spline"
          dur="1.5s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;4;0;0"
        />
      </circle>
      <circle cx="10" cy="20" r="0" fill="rgb(99, 100, 102)">
        <animate
          attributeName="r"
          begin="0"
          calcMode="spline"
          dur="1.5s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;4;0;0"
        />
      </circle>
    </svg>
  );
};

export default ThreeDotsLoading;
