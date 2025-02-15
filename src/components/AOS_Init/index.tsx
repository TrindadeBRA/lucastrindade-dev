"use client"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function AOS_Init() {

  useEffect(() => {
    AOS.init();
  }, []);

  return null;
}
