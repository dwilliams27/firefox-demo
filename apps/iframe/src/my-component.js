import { LitElement, html, css, render } from 'lit';

const loadingHtml = html`
  <head><title>Redirecting...</title></head>
  <body>
    <p>Preparing to redirect to PayPal...</p>
  </body>
`;

export class MyComponent extends LitElement {
  static properties = {
    status: { type: String },
    countdown: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    button {
      font-size: 16px;
      padding: 10px 20px;
      cursor: pointer;
    }
    .status {
      margin-top: 20px;
      padding: 10px;
      background: #f0f0f0;
      border-radius: 4px;
    }
  `;

  constructor() {
    super();
    this.status = '';
    this.countdown = 0;
    this._intervalId = null;
    this._windowRef = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  injectLoadingHtml() {
    const html = document.createElement('html');
    render(loadingHtml, html);
    this._windowRef.document.documentElement.replaceWith(html);
  }

  handleUnload = () => {
    if (Boolean(this._windowRef && !this._windowRef.closed)) {
      this._windowRef.close();
    }
  }

  async triggerBug() {
    this.status = 'Opening popup to about:blank...';

    this._windowRef = window.open('about:blank', 'testing', 'width=600,height=400,top=100,left=100');
    window.addEventListener('beforeunload', this.handleUnload, true);
    window.addEventListener('pagehide', this.handleUnload, true);

    if (!this._windowRef) {
      this.status = 'Popup blocked! Please allow popups and try again.';
      return;
    }

    if (this._windowRef.document.readyState === 'complete') {
      this.injectLoadingHtml();
    } else {
      this._windowRef.addEventListener('load', () => {
        this.injectLoadingHtml();
      });
    }

    this.countdown = 5;
    this.status = `Popup opened. Redirecting in ${this.countdown} seconds...`;

    await new Promise((resolve) => setTimeout(resolve, 5000));

    this.status = 'Redirecting popup now...';
    this._windowRef.location.replace('https://www.paypal.com');
  }

  render() {
    return html`
      <p>This page is inside an iframe (using Lit web component).</p>
      <button @click=${this.triggerBug}>Open popup and redirect after 5s</button>
      ${this.status ? html`<div class="status">${this.status}</div>` : ''}
    `;
  }
}

customElements.define('my-component', MyComponent);
