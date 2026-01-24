// "use client";
// import { ModeToggle } from "@/components/mode-toggle-theme";
// import { Button } from "@/components/ui/button";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { Calendar, UserCircle2 } from "lucide-react";
// import Link from "next/link";
// import MenuMobile from "./menu-mobile";
// import SignOutButton from "@/components/sign-out-button";

// const Header = () => {
//   const isMobile = useIsMobile();

//   return (
//     <div className="w-full p-6 border-b">
//       <div className="container mx-auto flex justify-between items-center">
//         <div>
//           <h1 className="text-lg md:text-2xl font-bold">
//             <Link href="/">
//               <span className="font-light">Hawkdev</span>_Barber
//             </Link>
//           </h1>
//         </div>
//         <div className="flex items-center gap-10">
//           {isMobile ? (
//             <MenuMobile />
//           ) : (
//             <>
//               <nav>
//                 <ul className="flex items-center gap-6">
//                   <Link href={""} className="flex gap-2">
//                     <Calendar /> Agendamentos
//                   </Link>
//                 </ul>
//               </nav>
//               <Button className="cursor-pointer">
//                 <UserCircle2 /> Perfil
//               </Button>
//               <SignOutButton />
//               <ModeToggle />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
