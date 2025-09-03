(function () {
  let iframe = null;
  let isOpen = false;

  // Ícones em SVG
  const chatIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" 
         style="width: 24px; height: 24px;">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 
           4.418-4.03 8-9 8a9.77 9.77 0 01-4.38-.97L3 
           20l1.21-3.63C3.45 15.22 3 13.66 3 
           12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  `;

  const closeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke="currentColor" 
         style="width: 24px; height: 24px;">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;

  // Cria botão
  const button = document.createElement("button");
  button.innerHTML = chatIcon;
  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)", // gradiente indigo
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
    animation: "popIn 0.4s ease-out",
  });

  // Estilos adicionais (hover/active/animação)
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
  `;
  document.head.appendChild(style);

  // Clique do botão
  button.onclick = () => {
    if (isOpen) {
      // fecha widget
      iframe?.remove();
      iframe = null;
      isOpen = false;
      button.innerHTML = chatIcon;
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
      button.innerHTML = closeIcon;
    }
  };

  // Fechar via React
  window.addEventListener("message", (event) => {
    if (event.data?.close) {
      iframe?.remove();
      iframe = null;
      isOpen = false;
      button.innerHTML = chatIcon;
    }
  });

  document.body.appendChild(button);
})();
