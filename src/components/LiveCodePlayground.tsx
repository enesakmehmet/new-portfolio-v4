import React, { useState, useRef, useEffect } from 'react';
import './LiveCodePlayground.css';

const defaultHTML = `<!-- HTML -->\n<h2>Merhaba Dünya!</h2>`;
const defaultCSS = `/* CSS */\nh2 { color: #4f8cff; text-align: center; }`;
const defaultJS = `// JS\nconsole.log('Hello from JS!');`;

const LiveCodePlayground: React.FC = () => {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCss] = useState(defaultCSS);
  const [js, setJs] = useState(defaultJS);
  const [srcDoc, setSrcDoc] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    const doc = `\n      <html>\n        <head>\n          <style>${css}</style>\n        </head>\n        <body>\n          ${html}\n          <script>${js}<\/script>\n        </body>\n      </html>\n    `;
    setSrcDoc(doc);
  };

  // Sayfa yüklendiğinde otomatik olarak kodu çalıştır
  useEffect(() => {
    runCode();
  }, []);

  return (
    <div className="live-playground-container">
      <div className="live-editors">
        <div>
          <label>HTML</label>
          <textarea value={html} onChange={e => setHtml(e.target.value)} />
        </div>
        <div>
          <label>CSS</label>
          <textarea value={css} onChange={e => setCss(e.target.value)} />
        </div>
        <div>
          <label>JS</label>
          <textarea value={js} onChange={e => setJs(e.target.value)} />
        </div>
      </div>
      <button className="run-btn" onClick={runCode}>Çalıştır</button>
      <div className="live-preview">
        <iframe
          title="Live Preview"
          srcDoc={srcDoc}
          ref={iframeRef}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default LiveCodePlayground;
