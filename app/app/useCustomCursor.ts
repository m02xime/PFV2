"use client";

import { useEffect } from "react";

export function useCustomCursor() {
	useEffect(() => {
		const cursorEl = document.getElementById("cursor-root");
		if (!cursorEl) return;

		const handleMove = (event: MouseEvent) => {
			cursorEl.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
			cursorEl.style.opacity = "1";
		};

		const handleEnter = () => {
			cursorEl.style.opacity = "1";
		};

		const handleLeave = () => {
			cursorEl.style.opacity = "0";
		};

		const handleDocumentMouseOver = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			if (!target) return;
			if (target.closest("a, button, [data-cursor-link]")) {
				cursorEl.classList.add("custom-cursor--link");
			}
		};

		const handleDocumentMouseOut = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			if (!target) return;
			if (target.closest("a, button, [data-cursor-link]")) {
				cursorEl.classList.remove("custom-cursor--link");
			}
		};

		window.addEventListener("mousemove", handleMove);
		window.addEventListener("mouseenter", handleEnter);
		window.addEventListener("mouseleave", handleLeave);
		document.addEventListener("mouseover", handleDocumentMouseOver);
		document.addEventListener("mouseout", handleDocumentMouseOut);

		return () => {
			window.removeEventListener("mousemove", handleMove);
			window.removeEventListener("mouseenter", handleEnter);
			window.removeEventListener("mouseleave", handleLeave);
			document.removeEventListener("mouseover", handleDocumentMouseOver);
			document.removeEventListener("mouseout", handleDocumentMouseOut);
		};
	}, []);
}
