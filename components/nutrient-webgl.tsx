"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type NutrientNode = {
  label: string;
  group: "vitamin" | "mineral" | "trace";
};

const nutrientNodes: NutrientNode[] = [
  { label: "Vitamin A", group: "vitamin" },
  { label: "Vitamin C", group: "vitamin" },
  { label: "Vitamin D", group: "vitamin" },
  { label: "Vitamin E", group: "vitamin" },
  { label: "Vitamin K", group: "vitamin" },
  { label: "B1 Thiamine", group: "vitamin" },
  { label: "B2 Riboflavin", group: "vitamin" },
  { label: "B3 Niacin", group: "vitamin" },
  { label: "B5 Pantothenic", group: "vitamin" },
  { label: "B6", group: "vitamin" },
  { label: "B7 Biotin", group: "vitamin" },
  { label: "B9 Folate", group: "vitamin" },
  { label: "B12", group: "vitamin" },
  { label: "Calcium", group: "mineral" },
  { label: "Magnesium", group: "mineral" },
  { label: "Potassium", group: "mineral" },
  { label: "Phosphorus", group: "mineral" },
  { label: "Sodium", group: "mineral" },
  { label: "Chloride", group: "mineral" },
  { label: "Iron", group: "trace" },
  { label: "Zinc", group: "trace" },
  { label: "Copper", group: "trace" },
  { label: "Manganese", group: "trace" },
  { label: "Selenium", group: "trace" },
  { label: "Iodine", group: "trace" },
  { label: "Chromium", group: "trace" },
  { label: "Molybdenum", group: "trace" }
];

const groupColor = {
  vitamin: "#dfffee",
  mineral: "#b9ffdf",
  trace: "#ffd3a1"
};

function makeLabelTexture(node: NutrientNode) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.width = 520 * ratio;
  canvas.height = 150 * ratio;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.scale(ratio, ratio);
  ctx.clearRect(0, 0, 520, 150);
  const color = groupColor[node.group];

  const gradient = ctx.createLinearGradient(0, 0, 520, 150);
  gradient.addColorStop(0, "rgba(255,255,255,0.16)");
  gradient.addColorStop(1, "rgba(185,255,224,0.055)");
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(225,255,241,0.24)";
  ctx.lineWidth = 1;
  roundRect(ctx, 12, 18, 496, 70, 24);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(44, 54, 7, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = node.group === "trace" ? "#ffe4c4" : "#effff6";
  ctx.font = "500 34px Inter, system-ui, sans-serif";
  ctx.fillText(node.label, 66, 61);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, "rgba(220,255,238,0.62)");
  gradient.addColorStop(0.2, "rgba(185,255,224,0.32)");
  gradient.addColorStop(0.48, "rgba(255,211,161,0.14)");
  gradient.addColorStop(1, "rgba(185,255,224,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

export function NutrientWebGL({
  ambient = false,
  className = ""
}: {
  ambient?: boolean;
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;
    const mount = mountElement;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040706, 0.08);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0, ambient ? 10.4 : 9.3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const glowSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture(),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );
    glowSprite.scale.set(3.8, 1.6, 1);
    group.add(glowSprite);

    const sprites: Array<
      THREE.Sprite & {
        userData: {
          angle: number;
          radius: number;
          speed: number;
          yBase: number;
          depth: number;
          baseWidth: number;
          baseHeight: number;
          focus: number;
        };
      }
    > = [];
    nutrientNodes.forEach((node, index) => {
      const texture = makeLabelTexture(node);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.96,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(material) as (typeof sprites)[number];
      const ring = index % 4;
      const radius = (ambient ? 2.25 : 1.9) + ring * (ambient ? 0.66 : 0.54) + (index % 3) * 0.1;
      const angle = (index / nutrientNodes.length) * Math.PI * 2;
      const depth = (ambient ? -2.1 : -1.25) + (index % 7) * (ambient ? 0.58 : 0.44);
      const baseWidth = ambient ? 2.28 : 2.52;
      const baseHeight = ambient ? 0.62 : 0.68;
      sprite.scale.set(baseWidth, baseHeight, 1);
      sprite.userData = {
        angle,
        radius,
        speed: 0.08 + (index % 5) * 0.012,
        yBase: Math.sin(index * 1.7) * 1.55,
        depth,
        baseWidth,
        baseHeight,
        focus: 0
      };
      group.add(sprite);
      sprites.push(sprite);
    });

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 260;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * (ambient ? 13 : 9);
      positions[i * 3 + 1] = (Math.random() - 0.5) * (ambient ? 10 : 7);
      positions[i * 3 + 2] = (Math.random() - 0.5) * (ambient ? 11 : 8);
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xb9ffdf,
        transparent: true,
        opacity: 0.52,
        size: 0.032,
        depthWrite: false
      })
    );
    scene.add(particles);

    const connectorMaterial = new THREE.LineBasicMaterial({
      color: 0x9cffcf,
      transparent: true,
      opacity: 0.16,
      depthWrite: false
    });
    const connectorGeometry = new THREE.BufferGeometry();
    const connectorPositions = new Float32Array(18 * 2 * 3);
    connectorGeometry.setAttribute("position", new THREE.BufferAttribute(connectorPositions, 3));
    const connectors = new THREE.LineSegments(connectorGeometry, connectorMaterial);
    group.add(connectors);

    function resize() {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      if (ambient) {
        group.position.x = camera.aspect > 1 ? 1.25 : 0.08;
        group.position.y = camera.aspect > 1 ? 0.12 : -0.34;
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frameId = 0;
    const clock = new THREE.Clock();

    function animate() {
      const elapsed = clock.getElapsedTime();
      group.rotation.y = Math.sin(elapsed * 0.16) * (ambient ? 0.3 : 0.22);
      group.rotation.x = Math.sin(elapsed * 0.11) * (ambient ? 0.1 : 0.08);
      particles.rotation.y = elapsed * 0.035;
      particles.rotation.x = elapsed * 0.018;

      let foremostIndex = -1;
      let foremostZ = -Infinity;

      sprites.forEach((sprite, index) => {
        const { angle, radius, speed, yBase, depth } = sprite.userData;
        const a = angle + elapsed * speed;
        sprite.position.set(
          Math.cos(a) * radius,
          yBase + Math.sin(elapsed * 0.7 + index) * 0.32,
          depth + Math.sin(a * 1.3) * 1.2
        );
        if (sprite.position.z > foremostZ) {
          foremostZ = sprite.position.z;
          foremostIndex = index;
        }
      });

      sprites.forEach((sprite) => {
        const focusTarget = THREE.MathUtils.clamp((sprite.position.z - foremostZ + 0.95) / 0.95, 0, 1);
        sprite.userData.focus = THREE.MathUtils.lerp(sprite.userData.focus, focusTarget, 0.075);
        const distanceAlpha = THREE.MathUtils.clamp((sprite.position.z + 4) / 7, 0.35, 1);
        const focus = sprite.userData.focus;
        const scaleBoost = 1 + focus * 0.32;
        sprite.scale.set(
          sprite.userData.baseWidth * scaleBoost,
          sprite.userData.baseHeight * scaleBoost,
          1
        );
        const material = sprite.material as THREE.SpriteMaterial;
        material.opacity = THREE.MathUtils.clamp(0.58 * distanceAlpha + focus * 0.54, 0.2, 1);
        material.color.setRGB(
          1,
          THREE.MathUtils.lerp(1, 0.94, focus),
          THREE.MathUtils.lerp(1, 0.78, focus)
        );
      });

      if (foremostIndex >= 0) {
        const foremost = sprites[foremostIndex];
        glowSprite.position.lerp(foremost.position, 0.1);
        glowSprite.position.z = foremost.position.z - 0.08;
        const glowFocus = foremost.userData.focus;
        glowSprite.scale.set(
          foremost.userData.baseWidth * (1.85 + glowFocus * 0.5),
          foremost.userData.baseHeight * (2.4 + glowFocus * 0.5),
          1
        );
        (glowSprite.material as THREE.SpriteMaterial).opacity = THREE.MathUtils.lerp(
          (glowSprite.material as THREE.SpriteMaterial).opacity,
          0.36 + glowFocus * 0.22,
          0.08
        );
      }

      const positionsAttr = connectorGeometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < 18; i += 1) {
        const a = sprites[i];
        const b = sprites[(i * 7 + 5) % sprites.length];
        positionsAttr.setXYZ(i * 2, a.position.x, a.position.y, a.position.z);
        positionsAttr.setXYZ(i * 2 + 1, b.position.x, b.position.y, b.position.z);
      }
      positionsAttr.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      sprites.forEach((sprite) => {
        const material = sprite.material as THREE.SpriteMaterial;
        material.map?.dispose();
        material.dispose();
      });
      const glowMaterial = glowSprite.material as THREE.SpriteMaterial;
      glowMaterial.map?.dispose();
      glowMaterial.dispose();
      particleGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      connectorGeometry.dispose();
      connectorMaterial.dispose();
      renderer.dispose();
    };
  }, [ambient]);

  const shellClass = ambient
    ? `nutrient-webgl nutrient-webgl--ambient overflow-hidden ${className}`
    : `nutrient-webgl relative overflow-hidden rounded-lg ${className}`;

  return (
    <div className={shellClass}>
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_50%,transparent_46%,rgba(4,7,6,0.2)_76%,rgba(4,7,6,0.58)_100%)]" />
    </div>
  );
}
