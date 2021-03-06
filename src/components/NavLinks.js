import { NavLink } from "react-router-dom";
import links from "../utils/links";
import React from 'react'

const NavLinks = ({toggleSidebar}) => {
  return (
   <div className="nav-links">
          {links.map((link)=>{
            const {text,id,icon,path}=link;
            return <NavLink
            to={path} key={id}  onClick={toggleSidebar} className={({isActive})=>{
              return isActive ? 'nav-link active':'nav-link'
            }}
            > <span className="icon">{icon}</span>{text}</NavLink>
          })}
        </div>
  )
}

export default NavLinks
