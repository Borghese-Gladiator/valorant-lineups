import React from "react";
// Custom Components
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function RootLayout({ btnRef, onOpen, isOpen, onClose, attackDefense, setAttackDefense, map, setMap, agent, setAgent, children }) {
  return (
    <>
      <Header btnRef={btnRef} onOpen={onOpen} 
        attackDefense={attackDefense}
        map={map}
        agent={agent}
      />
      <Sidebar
        btnRef={btnRef} isOpen={isOpen} onClose={onClose}
        attackDefense={attackDefense}
        setAttackDefense={setAttackDefense}
        map={map}
        setMap={setMap}
        agent={agent}
        setAgent={setAgent}
      />
      {children}
    </>
  )
}