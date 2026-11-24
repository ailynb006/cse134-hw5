class FactsSpotlight extends HTMLElement {
  static get observedAttributes() {
    return ["compact"];
  }

  constructor() {
    super();
    this._initialized = false;
    this._isloading = false;
  }

  connectedCallback() {
    if (!this._initialized) {
      this._buildInterface();
      this._initialized = true;
    }
    this._syncCompactState();
    this._loadCatFact();
  }

  attributeChangedCallback(name) {
    if (name === "compact" && this._initialized) {
      this._syncCompactState();
    }
  }

  _buildInterface() {
    this.textContent = "";

    const heading = document.createElement("h3");
    heading.textContent = "Featured Cat Fact";

    this._factEl = document.createElement("p");
    this._factEl.textContent = "Click below for a fact about cats.";

    this._extraDetailsContainer = document.createElement("div");
    this._lengthEl = document.createElement("p");
    this._lengthEl.textContent = "Fact length: —";

    this._extraDetailsContainer.appendChild(this._lengthEl);

    this._statusEl = document.createElement("p");
    this._statusEl.setAttribute("role", "status");
    this._statusEl.textContent = "Ready to fetch a cat fact.";

    this._fetchButton = document.createElement("button");
    this._fetchButton.type = "button";
    this._fetchButton.textContent = "Tell me something about cats";
    this._fetchButton.addEventListener("click", () => {
      this._loadCatFact();
    });

    this.appendChild(heading);
    this.appendChild(this._factEl);
    this.appendChild(this._extraDetailsContainer);
    this.appendChild(this._statusEl);
    this.appendChild(this._fetchButton);
  }

  //cat facts api call in here
  async _loadCatFact() {
  if (this._isLoading) return;

  this._isLoading = true;
  if (this._fetchButton) {
    this._fetchButton.disabled = true;
  }

  if (this._statusEl) {
    this._statusEl.textContent = "Fetching a new cat fact...";
  }

  try {
    const response = await fetch("https://catfact.ninja/fact");

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const data = await response.json();

    if (!data || typeof data !== "object" || typeof data.fact !== "string") {
      throw new Error("Expected a 'fact' string in the response.");
    }

    const cleanFact = data.fact.trim();
    if (cleanFact.length === 0) {
      throw new Error("Received an empty cat fact.");
    }

    if (this._factEl) {
      this._factEl.textContent = cleanFact;
    }

    if (this._lengthEl) {
      const lengthText =
        typeof data.length === "number" ? `${data.length} characters` : "Length unavailable";
      this._lengthEl.textContent = `Fact length: ${lengthText}`;
    }

    if (this._statusEl) {
      this._statusEl.textContent = "New cat fact loaded.";
    }
  } catch (error) {
    console.error("Could not load a cat fact.", error);

    if (this._statusEl) {
      this._statusEl.textContent = "Couldn't load a fact. Try again.";
    }
  } finally {
    this._isLoading = false;
    if (this._fetchButton) {
      this._fetchButton.disabled = false;
    }
  }
}

  _syncCompactState() {
    if (!this._extraDetailsContainer) return;
    this._extraDetailsContainer.hidden = this.hasAttribute("compact");
  }
}

customElements.define("facts-spotlight", FactsSpotlight);

const toggleDetailsBtn = document.querySelector("#toggle-details");
const spotlightEl = document.querySelector("facts-spotlight");


// quick check to see if the toggle button is there
if (toggleDetailsBtn && spotlightEl) {
  toggleDetailsBtn.addEventListener("click", () => {
    spotlightEl.toggleAttribute("compact");
  });
}