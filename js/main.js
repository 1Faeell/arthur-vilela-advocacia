AOS.init({ duration: 800, once: true });

// ---- Menu Mobile Logic ----
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Abrir/Fechar Menu
mobileToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.contains("translate-x-0");
  if (isOpen) {
    navMenu.classList.remove("translate-x-0");
    navMenu.classList.add("translate-x-full");
    mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
  } else {
    navMenu.classList.remove("translate-x-full");
    navMenu.classList.add("translate-x-0");
    mobileToggle.innerHTML = '<i class="bi bi-x-lg"></i>';
  }
});

// Fechar ao clicar em link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("translate-x-0");
    navMenu.classList.add("translate-x-full");
    mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
  });
});

// ---- Header Scroll ----
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  window.scrollY > 50
    ? header.classList.add("scrolled")
    : header.classList.remove("scrolled");
});

// ---- Modal Logic (Corrigido para Tailwind) ----
const modalBackdrop = document.getElementById("serviceModal");
const modalWindow = modalBackdrop.querySelector(".modal-window");
const serviceCards = document.querySelectorAll(".service-card");

function openModal(title, icon, desc, listString) {
  const iconEl = modalWindow.querySelector(".modal-icon");
  const titleEl = modalWindow.querySelector(".modal-title");
  const descEl = modalWindow.querySelector(".modal-desc");
  const listEl = modalWindow.querySelector(".modal-list");

  // Atualizar ícone mantendo as classes do Tailwind
  // Removemos o ícone antigo (ex: bi-shield-check) e adicionamos o novo
  // Resetamos a classe base para garantir
  iconEl.className = `bi ${icon} text-4xl text-accent mb-5 block modal-icon`;

  titleEl.textContent = title;
  descEl.textContent = desc;

  // Construir lista
  listEl.innerHTML = "";
  if (listString) {
    listString.split(";").forEach((item) => {
      const li = document.createElement("li");
      li.className = "flex items-start text-gray-300";
      li.innerHTML = `<i class="bi bi-check2 text-accent mr-3 mt-1 shrink-0"></i> <span>${item.trim()}</span>`;
      listEl.appendChild(li);
    });
  }

  modalBackdrop.classList.add("active");
  setTimeout(() => modalWindow.classList.add("active"), 10); // Delay p/ animação CSS
  document.body.style.overflow = "hidden"; // Travar scroll
}

function closeModal() {
  modalWindow.classList.remove("active");
  setTimeout(() => {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = ""; // Destravar scroll
  }, 300);
}

// Event Listeners nos Cards
serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    openModal(
      card.dataset.title,
      card.dataset.icon,
      card.dataset.desc,
      card.dataset.list
    );
  });
});

// Fechar ao clicar fora
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

// ---- Testimonial Slider ----
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((s) => {
    s.classList.remove("active");
    s.classList.add("hidden");
  });
  dots.forEach((d) => {
    d.classList.remove("bg-accent");
    d.classList.add("bg-white/20");
  });

  slides[index].classList.remove("hidden");
  // Pequeno delay para permitir o display:block antes da opacidade
  setTimeout(() => slides[index].classList.add("active"), 10);

  dots[index].classList.remove("bg-white/20");
  dots[index].classList.add("bg-accent");
  currentSlide = index;
}

// Init Slider
showSlide(0);
setInterval(() => showSlide((currentSlide + 1) % slides.length), 6000);

// Tratando o envio do formulário de contato (somente se todos os campos estiverem preenchidos)
const contactForm = document.querySelector("#contact form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const allFilled = [...formData.values()].every(
    (value) => value.trim() !== ""
  );
  if (allFilled) {
    alert("Obrigado por entrar em contato! Responderemos em breve.");
    contactForm.reset();
  } else {
    alert("Por favor, preencha todos os campos antes de enviar.");
  }
});

// FAQ
function toggleFAQ(button) {
  // 1. Identificar os elementos
  const item = button.closest(".faq-item");
  const answer = item.querySelector(".faq-answer");
  const icon = button.querySelector("i");

  // 2. Verificar se o item clicado já está aberto
  // Se maxHeight tiver valor, significa que está aberto
  const isOpen = answer.style.maxHeight;

  // 3. Fechar TODOS os outros itens (Comportamento de Acordeão)
  const allItems = document.querySelectorAll(".faq-item");

  allItems.forEach((otherItem) => {
    const otherAnswer = otherItem.querySelector(".faq-answer");
    const otherIcon = otherItem.querySelector(".faq-question i");

    // Reseta a altura para null (fechar)
    otherAnswer.style.maxHeight = null;

    // Reseta o ícone (remove a rotação)
    otherIcon.classList.remove("rotate-45");

    // Opcional: Remover destaque da borda se houver
    otherItem.classList.remove("border-accent");
    otherItem.classList.add("border-white/5");
  });

  // 4. Se o item clicado NÃO estava aberto, abrimos ele agora
  if (!isOpen) {
    // scrollHeight nos dá a altura exata do conteúdo interno
    answer.style.maxHeight = answer.scrollHeight + "px";

    // Gira o ícone para virar um X
    icon.classList.add("rotate-45");

    // Opcional: Destacar a borda do item ativo
    item.classList.remove("border-white/5");
    item.classList.add("border-accent");
  }
}
