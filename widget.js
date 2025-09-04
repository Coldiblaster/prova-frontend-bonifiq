(function () {
  let iframe = null;
  let isOpen = false;

  // Ícone chevron
  const chevronIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke="currentColor"
         style="width: 28px; height: 28px; transition: transform 0.3s ease;">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M19 9l-7 7-7-7" />
    </svg>
  `;

  // Cria botão
  const button = document.createElement("button");
  button.innerHTML = chevronIcon;
  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
    animation: "popIn 0.4s ease-out",
  });

  // Estilos extras
  const style = document.createElement("style");
  style.textContent = `
    @keyframes popIn {
      0% { transform: scale(0.6); opacity: 0; }
      80% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); }
    }
    button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0,0,0,0.3);
    }
    button:active {
      transform: scale(0.95);
    }
    button.open svg {
      transform: rotate(180deg);
    }
  `;
  document.head.appendChild(style);

  // Clique do botão
  button.onclick = () => {
    if (isOpen) {
      // fecha widget
      iframe?.remove();
      iframe = null;
      isOpen = false;
      button.classList.remove("open");
    } else {
      // abre widget
      iframe = document.createElement("iframe");

      const isMobile = window.innerWidth < 640;
      Object.assign(iframe.style, {
        position: "fixed",
        bottom: isMobile ? "0" : "80px",
        right: isMobile ? "0" : "20px",
        width: isMobile ? "100vw" : "320px",
        height: isMobile ? "100vh" : "600px",
        border: "1px solid #ccc",
        borderRadius: isMobile ? "0" : "8px",
        zIndex: 9999,
        background: "#fff",
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 0.3s ease",
      });

      iframe.src = "http://localhost:5173";
      document.body.appendChild(iframe);

      iframe.onload = () => {
        if (window.loggedUserId) {
          iframe.contentWindow.postMessage(
            { userId: window.loggedUserId },
            "*"
          );
        }
        // anima entrada
        requestAnimationFrame(() => {
          iframe.style.opacity = "1";
          iframe.style.transform = "translateY(0)";
        });
      };

      isOpen = true;
      button.classList.add("open");
    }
  };

  // Fechar via React
  window.addEventListener("message", (event) => {
    if (event.data?.close) {
      iframe?.remove();
      iframe = null;
      isOpen = false;
      button.classList.remove("open");
    }
  });

  document.body.appendChild(button);
})();
