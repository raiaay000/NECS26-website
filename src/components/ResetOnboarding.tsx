export function ResetOnboarding() {
  const reset = () => {
    localStorage.removeItem("hasCompletedOnboarding");
    window.location.reload();
  };

  return (
    <button
      onClick={reset}
      style={{
        position: "fixed",
        bottom: "12px",
        right: "12px",
        padding: "8px 12px",
        fontSize: "12px",
        borderRadius: "8px",
        background: "#111",
        color: "white",
        opacity: 0.4,
        zIndex: 9999,
      }}
    >
      Reset Tour
    </button>
  );
}
