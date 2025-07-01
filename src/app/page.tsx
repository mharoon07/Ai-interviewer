import Image from "next/image";
import Header from "@/components/header";
import  Grid  from "@/components/grid";
import Works from "@/components/works";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <Header />
      <Grid />
      <Works />
      <Footer />
    </>
  );
}
