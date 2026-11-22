const PLACEHOLDER_PROJECTS = [
  {
    title: "Placeholder Project 1",
    roleOrTag: "Role / Track Placeholder",
    summary: "Brief placeholder overview of what this project builds.",
    techStack: "Stack Placeholder: Tool A, Tool B",
    details: "Extra details placeholder: architecture highlight, role note, or outcome."
  },
  {
    title: "Placeholder Project 2",
    roleOrTag: "Role / Track Placeholder",
    summary: "Brief placeholder overview of a second project.",
    techStack: "Stack Placeholder: Tool C, Tool D",
    details: "Extra details placeholder: architecture highlight, role note, or outcome."
  },
  {
    title: "Placeholder Project 3",
    roleOrTag: "Role / Track Placeholder",
    summary: "Brief placeholder overview of a third project.",
    techStack: "Stack Placeholder: Tool E, Tool F",
    details: "Extra details placeholder: architecture highlight, role note, or outcome."
  }
];

class ProjectSpotlight extends HTMLElement {
  static get observedAttributes() {
    return ["compact"];
  }

  constructor() {
    super();
    this.items = PLACEHOLDER_PROJECTS;
    this.currentIndex = 0;
    this._initialized = false;
  }

  connectedCallback() {
    if (!this._initialized) {
      this._buildInterface();
      this._initialized = true;
    }
    this._renderItem();
    this._syncCompactState();
  }

  attributeChangedCallback(name) {
    if (name === "compact" && this._initialized) {
      this._syncCompactState();
    }
  }

  _buildInterface() {
    this.textContent = "";

    const heading = document.createElement("h3");
    heading.textContent = "Featured Project";

    this._titleEl = document.createElement("p");
    this._roleEl = document.createElement("p");
    this._summaryEl = document.createElement("p");

    this._extraDetailsContainer = document.createElement("div");
    this._techStackEl = document.createElement("p");
    this._detailsEl = document.createElement("p");
    this._extraDetailsContainer.appendChild(this._techStackEl);
    this._extraDetailsContainer.appendChild(this._detailsEl);

    this._statusEl = document.createElement("p");

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "Next Project";
    nextButton.addEventListener("click", () => {
      if (this.items.length === 0) return;
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this._renderItem();
    });

    this.appendChild(heading);
    this.appendChild(this._titleEl);
    this.appendChild(this._roleEl);
    this.appendChild(this._summaryEl);
    this.appendChild(this._extraDetailsContainer);
    this.appendChild(this._statusEl);
    this.appendChild(nextButton);
  }

  _renderItem() {
    const current = this.items[this.currentIndex];
    if (!current) return;

    this._titleEl.textContent = current.title;
    this._roleEl.textContent = current.roleOrTag;
    this._summaryEl.textContent = current.summary;
    this._techStackEl.textContent = current.techStack;
    this._detailsEl.textContent = current.details;
    this._statusEl.textContent = `Project ${this.currentIndex + 1} of ${this.items.length}`;
  }

  _syncCompactState() {
    if (!this._extraDetailsContainer) return;
    this._extraDetailsContainer.hidden = this.hasAttribute("compact");
  }
}

customElements.define("project-spotlight", ProjectSpotlight);

const toggleDetailsBtn = document.querySelector("#toggle-details");
const spotlightEl = document.querySelector("project-spotlight");


// quick check to see if the toggle button is there
if (toggleDetailsBtn && spotlightEl) {
  toggleDetailsBtn.addEventListener("click", () => {
    spotlightEl.toggleAttribute("compact");
  });
}