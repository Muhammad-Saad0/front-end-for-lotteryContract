import Image from "next/image";
import { Inter } from "next/font/google";
// import ManualHeader from "@/components/ManualHeader";
import Header from "@/components/Header";
import LotteryEntrance from "@/components/LotteryEntrance";

export default function Home() {
  return (
    <main>
      <Header />
      <LotteryEntrance />
    </main>
  );
}
