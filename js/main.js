/*
 * Lógica de interfaz. Los textos están en content.js y los datos de contacto en config.js.
 */
(function () {
  "use strict";

  var CONFIG = window.SITE_CONFIG || {};
  var CONTENT = window.SITE_CONTENT || {};

  /* ---------- Utilidades ---------- */
  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "className") node.className = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    if (text != null) node.textContent = text;
    return node;
  }

  function isSet(value) {
    return typeof value === "string" && value.trim() !== "";
  }

  /* ---------- Registro de ventanas ---------- */
  var dialogs = {};

  function register(item) {
    if (item && item.id && item.dialog) dialogs[item.id] = item.dialog;
  }

  function actionButton(item, extraClass) {
    var btn = el("button", {
      type: "button",
      className: "card__action" + (extraClass ? " " + extraClass : ""),
      "aria-haspopup": "dialog",
      "data-dialog": item.id
    });
    btn.appendChild(el("span", null, item.button));
    btn.appendChild(el("span", { className: "card__arrow", "aria-hidden": "true" }, "→"));
    return btn;
  }

  /* ---------- Tarjetas ---------- */
  function renderCards(target, items, variant) {
    if (!target || !Array.isArray(items)) return;
    var frag = document.createDocumentFragment();
    items.forEach(function (item, index) {
      register(item);
      var card = el("article", {
        className: "card card--" + variant,
        "aria-labelledby": "card-" + item.id
      });
      if (variant === "hobby") {
        card.appendChild(el("span", { className: "card__num", "aria-hidden": "true" },
          String(index + 1).padStart(2, "0")));
      }
      var top = el("div", { className: "card__top" });
      if (item.kicker) top.appendChild(el("p", { className: "card__kicker" }, item.kicker));
      if (item.badge) {
        var exploring = item.badge.toLowerCase().indexOf("explor") !== -1;
        top.appendChild(el("span", {
          className: "badge" + (exploring ? " badge--explore" : "")
        }, item.badge));
      }
      if (top.childNodes.length) card.appendChild(top);
      card.appendChild(el("h3", { className: "card__title", id: "card-" + item.id }, item.title));
      card.appendChild(el("p", { className: "card__summary" }, item.summary));
      if (item.dialog && item.button) card.appendChild(actionButton(item));
      frag.appendChild(card);
    });
    target.appendChild(frag);
  }

  /* ---------- Diálogo ---------- */
  var dialog = document.getElementById("detail-dialog");
  var dialogTitle = document.getElementById("dialog-title");
  var dialogBody = document.getElementById("dialog-body");
  var lastOpener = null;

  function fillDialog(data) {
    dialogTitle.textContent = data.title || "";
    dialogBody.textContent = "";
    if (data.intro) dialogBody.appendChild(el("p", { className: "dialog__intro" }, data.intro));
    (data.sections || []).forEach(function (section) {
      var wrap = el("div", { className: "dialog__section" });
      if (section.heading) wrap.appendChild(el("h3", null, section.heading));
      if (section.text) wrap.appendChild(el("p", null, section.text));
      if (Array.isArray(section.items) && section.items.length) {
        var ul = el("ul");
        section.items.forEach(function (t) { ul.appendChild(el("li", null, t)); });
        wrap.appendChild(ul);
      }
      dialogBody.appendChild(wrap);
    });
    if (data.outro) dialogBody.appendChild(el("p", { className: "dialog__outro" }, data.outro));
  }

  function openDialog(id, opener) {
    var data = dialogs[id];
    if (!data || !dialog) return;
    if (dialog.open) dialog.close(); // nunca dos a la vez
    lastOpener = opener || document.activeElement;
    fillDialog(data);
    dialog.showModal();
    document.documentElement.classList.add("has-dialog");
    dialogBody.scrollTop = 0;
    dialog.querySelector("[data-close]").focus();
  }

  if (dialog) {
    dialog.addEventListener("close", function () {
      document.documentElement.classList.remove("has-dialog");
      if (lastOpener && typeof lastOpener.focus === "function") {
        lastOpener.focus();
      }
      lastOpener = null;
    });
    dialog.addEventListener("click", function (event) {
      // Botón Cerrar o clic en el fondo oscuro (fuera del panel)
      if (event.target.closest("[data-close]") || event.target === dialog) {
        dialog.close();
      }
    });
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-dialog]");
    if (trigger) openDialog(trigger.getAttribute("data-dialog"), trigger);
  });

  /* ---------- Contacto ---------- */
  var CHANNELS = [
    { key: "github", label: "GitHub" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "orcid", label: "ORCID" },
    { key: "scholar", label: "Google Scholar" }
  ];

  function setStatus(message) {
    var status = document.querySelector(".contact__status");
    if (!status) return;
    status.textContent = "";
    // Pequeño retardo para que los lectores de pantalla anuncien mensajes repetidos
    window.setTimeout(function () { status.textContent = message; }, 50);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = el("textarea", { readonly: "", "aria-hidden": "true" });
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(area);
      if (ok) resolve(); else reject(new Error("copy failed"));
    });
  }

  function renderContact(config) {
    var target = document.querySelector('[data-render="contact"]');
    if (!target) return;
    target.textContent = "";

    var hasEmail = isSet(config.email);
    var links = CHANNELS.filter(function (c) { return isSet(config[c.key]); });

    if (!hasEmail && !links.length) {
      target.appendChild(el("p", { className: "contact__pending" },
        "Datos de contacto pendientes de configurar"));
      return;
    }

    if (hasEmail) {
      var email = config.email.trim();
      var block = el("div", { className: "contact__email" });
      var address = el("p", { className: "contact__address" });
      // Permite el salto de línea tras la arroba en pantallas estrechas
      var at = email.indexOf("@");
      if (at > 0) {
        address.appendChild(document.createTextNode(email.slice(0, at + 1)));
        address.appendChild(document.createElement("wbr"));
        address.appendChild(document.createTextNode(email.slice(at + 1)));
      } else {
        address.textContent = email;
      }
      block.appendChild(address);
      var actions = el("div", { className: "contact__actions" });
      var mail = el("a", { className: "btn btn--primary", href: "mailto:" + email }, "Escríbeme");
      var copy = el("button", { type: "button", className: "btn btn--ghost" }, "Copiar dirección");
      copy.addEventListener("click", function () {
        copyText(email).then(
          function () { setStatus("Dirección copiada al portapapeles."); },
          function () { setStatus("No se ha podido copiar. Selecciona la dirección y cópiala manualmente."); }
        );
      });
      actions.appendChild(mail);
      actions.appendChild(copy);
      block.appendChild(actions);
      target.appendChild(block);
    }

    if (links.length) {
      var ul = el("ul", { className: "contact__links", "aria-label": "Perfiles" });
      links.forEach(function (c) {
        var li = el("li");
        var a = el("a", {
          className: "link-chip",
          href: config[c.key].trim(),
          target: "_blank",
          rel: "noopener noreferrer"
        });
        a.appendChild(el("span", null, c.label));
        a.appendChild(el("span", { className: "visually-hidden" }, " (se abre en una pestaña nueva)"));
        a.appendChild(el("span", { className: "link-chip__arrow", "aria-hidden": "true" }, "↗"));
        li.appendChild(a);
        ul.appendChild(li);
      });
      target.appendChild(ul);
    }
  }

  /* ---------- Retrato ---------- */
  function renderPortrait(config) {
    var frame = document.getElementById("portrait");
    if (!frame || !isSet(config.photo)) return;
    var img = el("img", {
      src: config.photo,
      alt: isSet(config.photoAlt) ? config.photoAlt : "Retrato de Jorge García",
      width: "400",
      height: "480",
      decoding: "async"
    });
    img.className = "portrait-photo";
    // Si la foto no carga, se mantiene el monograma
    img.addEventListener("load", function () {
      frame.textContent = "";
      frame.appendChild(img);
      frame.classList.add("portrait-frame--photo");
    });
  }

  /* ---------- Navegación ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    }

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
      });
      links.forEach(function (a) {
        a.addEventListener("click", function () { setOpen(false); });
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
          setOpen(false);
          toggle.focus();
        }
      });
    }

    // Sección activa en el menú
    if (!("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var active = map[entry.target.id];
        if (active) active.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Tema claro / oscuro ---------- */
  var THEME_COLORS = { dark: "#0B0B0D", light: "#F3F2EE" };

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      var label = theme === "light" ? "Activar tema oscuro" : "Activar tema claro";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    }
  }

  function savedTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }

  function initTheme() {
    applyTheme(currentTheme());
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = currentTheme() === "light" ? "dark" : "light";
        applyTheme(next);
        try { localStorage.setItem("theme", next); } catch (e) { /* sin almacenamiento: solo esta visita */ }
      });
    }
    // Si no hay preferencia guardada, sigue los cambios del sistema
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: light)");
      var onChange = function (event) {
        var s = savedTheme();
        if (s !== "light" && s !== "dark") applyTheme(event.matches ? "light" : "dark");
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ---------- Arranque ---------- */
  initTheme();
  renderCards(document.querySelector('[data-render="teaching"]'), CONTENT.teaching, "teaching");
  renderCards(document.querySelector('[data-render="research"]'), CONTENT.research, "research");
  renderCards(document.querySelector('[data-render="hobbies"]'), CONTENT.hobbies, "hobby");

  if (CONTENT.about) {
    register(CONTENT.about);
    var aboutTarget = document.querySelector('[data-render="about-action"]');
    if (aboutTarget) aboutTarget.appendChild(actionButton(CONTENT.about, "card__action--wide"));
  }

  var loc = document.querySelector('[data-render="location"]');
  if (loc && isSet(CONFIG.location)) loc.textContent = CONFIG.location;

  var year = document.querySelector('[data-render="year"]');
  if (year) year.textContent = String(new Date().getFullYear());

  renderContact(CONFIG);
  renderPortrait(CONFIG);
  initNav();
})();
