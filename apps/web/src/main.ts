import { gsap } from 'gsap';
import * as THREE from 'three';
import './style.css';

type DemoApiResponse = {
  service: string;
  status: string;
  uptimeSeconds: number;
  timestamp: string;
  message: string;
};

const app = mustElement<HTMLDivElement>('#app');

app.innerHTML = `
  <main class="layout">
    <div class="ambient ambient-a"></div>
    <div class="ambient ambient-b"></div>
    <canvas id="scene" aria-hidden="true"></canvas>

    <header class="hero reveal">
      <p class="eyebrow">Vite + TypeScript + GSAP + Three.js</p>
      <h1>Test Lab Moderne<br />Front + Back clean</h1>
      <p class="lead">
        Base prete pour prototyper vite: animation fluide, scene 3D, et API Node
        branchee en direct.
      </p>
      <div class="actions">
        <button class="btn btn-primary" type="button" id="refresh-api">Refresh API</button>
        <a class="btn btn-secondary" href="http://localhost:8787/api/health" target="_blank" rel="noreferrer">Health API</a>
      </div>
    </header>

    <section class="info-grid">
      <article class="card reveal" id="status-card">
        <p class="card-label">Etat backend</p>
        <h2 id="api-state">Chargement...</h2>
        <p id="api-time">En attente de reponse.</p>
      </article>
      <article class="card reveal">
        <p class="card-label">Stack</p>
        <h2>Architecture claire</h2>
        <p>Monorepo workspace avec apps web/api, scripts unifies et TypeScript partout.</p>
      </article>
      <article class="card reveal">
        <p class="card-label">Animation</p>
        <h2>Motion premium</h2>
        <p>GSAP gere les reveals, Three.js gere le fond 3D reactif a la souris.</p>
      </article>
    </section>
  </main>
`;

const refreshButton = mustElement<HTMLButtonElement>('#refresh-api');
const apiState = mustElement<HTMLElement>('#api-state');
const apiTime = mustElement<HTMLElement>('#api-time');
const statusCard = mustElement<HTMLElement>('#status-card');
const canvas = mustElement<HTMLCanvasElement>('#scene');

setupRevealAnimation();
setupThreeScene(canvas);
void loadApiStatus();

refreshButton.addEventListener('click', () => {
  void loadApiStatus();
});

async function loadApiStatus(): Promise<void> {
  apiState.textContent = 'Chargement...';
  apiTime.textContent = 'Connexion API en cours...';
  statusCard.classList.remove('offline');
  try {
    const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';
    const response = await fetch(baseUrl ? `${baseUrl}/api/demo` : '/api/demo');
    if (!response.ok) {
      throw new Error(`API request failed (${response.status})`);
    }

    const payload = (await response.json()) as DemoApiResponse;
    apiState.textContent = `API ${payload.status.toUpperCase()}`;
    apiTime.textContent = `${payload.service} - ${new Date(payload.timestamp).toLocaleString('fr-FR')}`;
    statusCard.classList.remove('offline');
  } catch {
    apiState.textContent = 'API OFFLINE';
    apiTime.textContent = 'Lance `npm run dev` a la racine.';
    statusCard.classList.add('offline');
  }
}

function setupRevealAnimation(): void {
  gsap.set('.reveal', { autoAlpha: 0, y: 28 });
  gsap.timeline({ defaults: { ease: 'power3.out' } }).to('.reveal', {
    autoAlpha: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.12
  });

  gsap.to('.ambient-a', {
    xPercent: 15,
    yPercent: -10,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.ambient-b', {
    xPercent: -12,
    yPercent: 12,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

function setupThreeScene(canvasElement: HTMLCanvasElement): void {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#08101f', 0.11);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.set(0, 0, 5.8);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const lightA = new THREE.DirectionalLight('#7dd3fc', 1.3);
  lightA.position.set(2, 3, 4);
  scene.add(lightA);

  const lightB = new THREE.DirectionalLight('#f97316', 1.1);
  lightB.position.set(-2, -2, 2);
  scene.add(lightB);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.33, 220, 40),
    new THREE.MeshPhysicalMaterial({
      color: '#22d3ee',
      roughness: 0.15,
      metalness: 0.75,
      clearcoat: 1,
      clearcoatRoughness: 0.2
    })
  );
  scene.add(knot);

  const starsGeometry = new THREE.BufferGeometry();
  const count = 700;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const stars = new THREE.Points(
    starsGeometry,
    new THREE.PointsMaterial({
      color: '#f5f7ff',
      size: 0.03,
      transparent: true,
      opacity: 0.65
    })
  );
  scene.add(stars);

  const pointer = new THREE.Vector2(0, 0);
  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  const clock = new THREE.Clock();

  const resize = () => {
    const { clientWidth, clientHeight } = canvasElement;
    if (!clientWidth || !clientHeight) {
      return;
    }
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  };

  resize();
  window.addEventListener('resize', resize);

  const render = () => {
    const elapsed = clock.getElapsedTime();

    knot.rotation.x = elapsed * 0.35;
    knot.rotation.y = elapsed * 0.5;
    knot.position.x = Math.sin(elapsed * 0.6) * 0.2;

    stars.rotation.y = -elapsed * 0.04;
    stars.rotation.x = elapsed * 0.02;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.45, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.25, 0.04);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
}

function mustElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing element: ${selector}`);
  }
  return element;
}
