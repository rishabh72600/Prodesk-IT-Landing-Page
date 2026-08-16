"use strict";

let CONTENT;

class EventBus {
  #listeners = new Map();
  on(event, listener) { 
    const set = this.#listeners.get(event) || new Set(); 
    set.add(listener); this.#listeners.set(event, set); return () => this.off(event, listener); 
  }
  off(event, listener) { 
    this.#listeners.get(event)?.delete(listener); 
  }
  emit(event, payload) { 
    this.#listeners.get(event)?.forEach((listener) => listener(payload)); 
  }
  clear() { 
    this.#listeners.clear(); 
  }
}

const STORAGE_KEY = "prodesk-it-state";
const DEFAULT_STATE = { 
  theme: "light", menuOpen: false, selectedService: null, contactOpen: false 
};
const getSavedState = () => { 
  try { 
    return { ...DEFAULT_STATE, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; 
  } catch { 
    return { ...DEFAULT_STATE }; 
  } };
class Store {
  constructor(bus) { 
    this.bus = bus; 
    this.state = getSavedState();
   }
  update(change) { 
    this.state = { ...this.state, ...change }; 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); 
    this.bus.emit("state:changed", this.state); 
  }
}

class ProdeskApp {
  constructor(root) { 
    this.root = root; 
    this.bus = new EventBus(); 
    this.store = new Store(this.bus); 
    this.listeners = []; 
    this.unsubscribe = this.bus.on("state:changed", (state) => this.render(state)); 
  }
  start() { 
    this.render(this.store.state); 
  }
  render(state) {
    this.unbindEvents();
    document.documentElement.dataset.theme = state.theme;
    const serviceCards = CONTENT.services.map(([icon, title, copy], i) => `<button class="service-card ${state.selectedService === i ? "is-selected" : ""}" type="button" data-service="${i}" aria-pressed="${state.selectedService === i}"><i class="fa-solid ${icon}" aria-hidden="true"></i><h3>${title}</h3><p>${copy}</p></button>`).join("");
    const stats = CONTENT.stats.map(([value, label]) => `<div class="stat"><h2>${value}</h2><p>${label}</p></div>`).join("");
    const selection = state.selectedService === null ? "Select a service to learn more about our capabilities." : `${CONTENT.services[state.selectedService][1]} selected — our team will tailor a solution to your goals.`;
    this.root.innerHTML = `<header class="header"><nav class="navbar container"><a class="navbar__logo" href="#home"><h2>${CONTENT.company}</h2></a><div class="navbar__right"><ul class="navbar__menu ${state.menuOpen ? "active" : ""}"><li><a href="#home" class="navbar__link">Home</a></li><li><a href="#services" class="navbar__link">Services</a></li><li><a href="#about" class="navbar__link">About</a></li><li><a href="#contact" class="navbar__link">Contact</a></li></ul><button id="theme-toggle" class="theme-btn" aria-label="Switch to ${state.theme === "dark" ? "light" : "dark"} mode">${state.theme === "dark" ? "☀️" : "🌙"}</button><button class="navbar__toggle" id="menu-toggle" aria-label="${state.menuOpen ? "Close" : "Open"} menu" aria-expanded="${state.menuOpen}"><i class="fa-solid fa-bars"></i></button></div></nav></header><main><section class="hero" id="home"><div class="container hero__container"><div class="hero__content"><h1 class="hero__title">${CONTENT.hero.title}</h1><p class="hero__subtitle">${CONTENT.hero.subtitle}</p><div class="hero__buttons"><button class="btn btn--primary" data-contact>Get Started</button><a href="#services" class="btn btn--secondary">Our Services</a></div></div><div class="hero__image"><img src="${CONTENT.hero.image[0]}" alt="${CONTENT.hero.image[1]}" width="600" height="500"></div></div></section><section class="services section" id="services"><div class="container"><div class="section__heading"><h2>Our Services</h2><p>Innovative technology solutions tailored to your business needs.</p></div><div class="services__grid">${serviceCards}</div><p class="service-status" id="service-status"></p></div></section><section class="about section" id="about"><div class="container about__container"><div class="about__image"><img src="assets/images/about.webp" alt="Prodesk IT team at work" width="550" height="450" loading="lazy"></div><div class="about__content"><h2>About ${CONTENT.company}</h2><p>Prodesk IT delivers innovative software solutions that help businesses grow, modernize, and succeed in an increasingly digital world.</p><p>Our team specializes in web development, cloud computing, enterprise software, AI solutions, cybersecurity, and digital transformation.</p><button class="btn btn--primary" data-contact>Learn More</button></div></div></section><section class="stats section"><div class="container stats__grid">${stats}</div></section><section class="contact section" id="contact"><div class="container contact__box"><h2>Ready to Build Something Amazing?</h2><p>Let's discuss your next project and transform your ideas into reality.</p><button class="btn btn--primary" data-contact>Contact Us</button></div></section></main><footer class="footer"><div class="container footer__container"><h3>${CONTENT.company}</h3><p>Empowering businesses through technology and innovation.</p><p class="footer__copyright">© 2026 ${CONTENT.company}. All Rights Reserved.</p></div></footer><div class="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" ${state.contactOpen ? "" : "hidden"}><div class="modal__content"><button class="modal__close" data-close aria-label="Close contact dialog">×</button><h2 id="contact-title">Let's start a conversation</h2><p>Tell us about your project at <a href="mailto:hello@prodeskit.example">hello@prodeskit.example</a>.</p></div></div>`;
    this.root.querySelector("#service-status").textContent = selection;
    this.hydrateVisibleText(CONTENT);
    this.bindEvents();
  }
  hydrateVisibleText(data) {
    const set = (selector, value) => { 
      const element = this.root.querySelector(selector); 
      if (element) element.textContent = value; 

    };
    this.root.querySelectorAll(".navbar__link").forEach((link, index) => { 
      link.textContent = data.navigation[index]; 
    });
    set(".navbar__logo h2", data.company);
    set(".hero__title", data.hero.title); 
    set(".hero__subtitle", data.hero.subtitle);
    const contactButtons = this.root.querySelectorAll("[data-contact]");

    if (contactButtons[0]) contactButtons[0].textContent = data.hero.primaryAction;
    if (contactButtons[1]) contactButtons[1].textContent = data.about.action;
    if (contactButtons[2]) contactButtons[2].textContent = data.contact.action;

    set(".btn--secondary", data.hero.secondaryAction); 
    set(".services .section__heading h2", data.servicesSection.title); 
    set(".services .section__heading p", data.servicesSection.subtitle);
    set(".about__content h2", data.about.title); 
    this.root.querySelectorAll(".about__content p").forEach((paragraph, index) => { paragraph.textContent = data.about.paragraphs[index]; 
    });
    set("#contact h2", data.contact.title); set("#contact p", data.contact.subtitle); set(".footer h3", data.company);

    const footerText = this.root.querySelectorAll(".footer p"); 
    if (footerText[0]) footerText[0].textContent = data.footer.tagline; 
    if (footerText[1]) footerText[1].textContent = data.footer.copyright;
    set("#contact-title", data.modal.title); 
    const modalLink = this.root.querySelector(".modal__content a"); 
    if (modalLink) { modalLink.href = `mailto:${data.modal.email}`; 
    modalLink.textContent = data.modal.email; 
  }
    const heroImage = this.root.querySelector(".hero__image img"); 
    if (heroImage) { heroImage.src = data.hero.image[0]; 
      heroImage.alt = data.hero.image[1]; 
    }
    const aboutImage = this.root.querySelector(".about__image img"); 
    if (aboutImage) { aboutImage.src = data.about.image[0]; 
      aboutImage.alt = data.about.image[1]; }
  }

  listen(element, event, handler) { 
    element.addEventListener(event, handler); 
    this.listeners.push([element, event, handler]); 
  }

  bindEvents() { 
    const update = (change) => this.store.update(change); 
    this.listen(this.root.querySelector("#theme-toggle"), "click", () => update({ 
      theme: this.store.state.theme === "dark" ? "light" : "dark" })); 
      this.listen(this.root.querySelector("#menu-toggle"), "click", () => update({ menuOpen: !this.store.state.menuOpen })); 
      this.root.querySelectorAll(".navbar__link").forEach((link) => this.listen(link, "click", () => update({ menuOpen: false }))); 
      this.root.querySelectorAll("[data-service]").forEach((card) => this.listen(card, "click", () => update({ selectedService: Number(card.dataset.service) }))); 
      this.root.querySelectorAll("[data-contact]").forEach((button) => this.listen(button, "click", () => update({ contactOpen: true }))); 
      this.listen(this.root.querySelector("[data-close]"), "click", () => update({ contactOpen: false })); 
    }

  unbindEvents() { 
    this.listeners.forEach(([element, event, handler]) => element.removeEventListener(event, handler)); 
    this.listeners = []; 
  }

  destroy() { 
    this.unbindEvents(); 
    this.unsubscribe(); 
    this.bus.clear(); 
    this.root.replaceChildren(); 
  }
}

async function bootstrap() {
  const root = document.getElementById("app");
  try {
    const response = await fetch("./content.json");
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    CONTENT = await response.json();
    const app = new ProdeskApp(root);
    app.start();
    window.addEventListener("pagehide", () => app.destroy(), { once: true });
  } catch (error) {
    console.error(error);
    root.textContent = "We could not load the page content. Please refresh and try again.";
  }
}

bootstrap();
