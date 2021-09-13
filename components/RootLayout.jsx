import React from "react";
// Custom Components
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function RootLayout({ btnRef, onOpen, isOpen, onClose, clickFilter, attackDefense, setAttackDefense, map, setMap, agent, setAgent, children }) {
  return (
    <>
      <Header btnRef={btnRef} onOpen={onOpen} />
      <Sidebar
        clickFilter={clickFilter}
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