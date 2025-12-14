"use client";

import { useEffect, useRef } from "react";
import Zdog from "zdog";

type ZdogIllustrationLike = {
	rotate: { x: number; y: number };
	updateRenderGraph: () => void;
};

const palette = {
	primary: "#38bdf8",
	accent: "#a855f7",
	emerald: "#34d399",
	dark: "#030712",
};

export function ZdogBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationRef = useRef<number | null>(null);
	const tiltRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
	const illustrationRef = useRef<ZdogIllustrationLike | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const initIllustration = () => {
			const { innerWidth, innerHeight } = window;
			canvas.width = innerWidth;
			canvas.height = innerHeight;

			const zoom = Math.min(innerWidth, innerHeight) / 480;

			const Z = Zdog as unknown as {
				Illustration: new (args: unknown) => ZdogIllustrationLike;
				Group: new (args: unknown) => unknown;
				Rect: new (args: unknown) => unknown;
				Shape: new (args: unknown) => unknown;
				Ellipse: new (args: unknown) => unknown;
				Anchor: new (args: unknown) => unknown;
			};

			illustrationRef.current = new Z.Illustration({
				element: canvas,
				dragRotate: false,
				resize: true,
				zoom: zoom < 0.8 ? 0.8 : zoom,
			});

			const illo = illustrationRef.current;
			if (!illo) return;

			const depth = {
				board: -50,
				orbit: -20,
				ring: 15,
				pulse: 35,
				markers: 65,
			};

			const boardGroup = new Z.Group({ addTo: illo });

			new Z.Rect({
				addTo: boardGroup,
				width: 320,
				height: 320,
				stroke: 12,
				cornerRadius: 48,
				color: palette.dark,
				fill: true,
				backface: "transparent",
				translate: { z: depth.board },
			});

			new Z.Shape({
				addTo: boardGroup,
				stroke: 350,
				color: palette.dark,
				visible: false,
				translate: { z: depth.board - 20 },
			});

			new Z.Ellipse({
				addTo: boardGroup,
				diameter: 280,
				stroke: 18,
				color: palette.primary,
				quarters: 2,
				translate: { z: depth.orbit },
			});

			new Z.Ellipse({
				addTo: boardGroup,
				diameter: 220,
				stroke: 6,
				color: palette.accent,
				translate: { z: depth.ring },
				rotate: { x: Math.PI / 2.3 },
			});

			const pulse = new Z.Shape({
				addTo: boardGroup,
				path: [
					{ x: -80, y: 0 },
					{ arc: [
						{ x: -40, y: -30 },
						{ x: 0, y: 0 },
					] },
					{ arc: [
						{ x: 40, y: 30 },
						{ x: 80, y: 0 },
					] },
				],
				stroke: 10,
				color: palette.emerald,
				translate: { z: depth.pulse },
			});

			new Z.Anchor({
				addTo: pulse,
				rotate: { z: Math.PI },
			});

			const markers = new Z.Group({ addTo: illo, translate: { z: depth.markers } });
			const markerPositions = [
				{ x: -120, y: -60, color: palette.primary },
				{ x: 140, y: -40, color: palette.accent },
				{ x: -50, y: 110, color: palette.emerald },
				{ x: 100, y: 120, color: palette.primary },
			];

			markerPositions.forEach((pos) => {
				const dotGroup = new Z.Group({ addTo: markers });

				new Z.Shape({
					addTo: dotGroup,
					stroke: 18,
					translate: { x: pos.x, y: pos.y },
					color: pos.color,
				});

				new Z.Shape({
					addTo: dotGroup,
					visible: false,
					translate: { x: pos.x * -0.6, y: pos.y * -0.6, z: -30 },
				});
			});
		};

		const handlePointerMove = (event: PointerEvent) => {
			const { innerWidth, innerHeight } = window;
			const x = (event.clientX / innerWidth - 0.5) * 2;
			const y = (event.clientY / innerHeight - 0.5) * 2;
			tiltRef.current.targetY = x * 0.5;
			tiltRef.current.targetX = y * 0.4;
		};

		let spin = 0;

		const lerp = (start: number, end: number, amt: number) =>
			start + (end - start) * amt;

		const animate = () => {
			const illo = illustrationRef.current;
			if (illo) {
				tiltRef.current.currentX = lerp(
					tiltRef.current.currentX,
					tiltRef.current.targetX,
					0.08,
				);
				tiltRef.current.currentY = lerp(
					tiltRef.current.currentY,
					tiltRef.current.targetY,
					0.08,
				);

				spin += 0.01;
				illo.rotate.x = tiltRef.current.currentX;
				illo.rotate.y = spin + tiltRef.current.currentY;
				illo.updateRenderGraph();
			}

			animationRef.current = requestAnimationFrame(animate);
		};

		initIllustration();
		animate();
		window.addEventListener("resize", initIllustration);
		window.addEventListener("pointermove", handlePointerMove);

		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
			window.removeEventListener("resize", initIllustration);
			window.removeEventListener("pointermove", handlePointerMove);
			illustrationRef.current = null;
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className="pointer-events-none absolute inset-0 h-full w-full opacity-90 [filter:blur(0.5px)]"
		/>
	);
}
