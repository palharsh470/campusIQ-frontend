
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BuildingsIcon,
  
} from "@phosphor-icons/react";
import UserBadge from "../../../components/UserBadge";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
    const {user} = useAuth()

  return (
    <header className="sticky -mt-7 top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-xl">
      <div className="flex h-18 items-center justify-between gap-4 px-5 sm:px-8">
    
        <button
          onClick={() => navigate("/")}
          aria-label="Go to CampusIQ home"
          className="shrink-0 text-2xl font-bold tracking-tight"
        >
          <span className="text-green-500">Campus</span>
          <span className="text-white">IQ</span>
        </button>

        
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 sm:flex">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900">
            <BuildingsIcon
              size={19}
              weight="duotone"
              className="text-green-400"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">
              Organization
            </p>
            <p
              title={user.organization.name}
              className="max-w-[320px] truncate text-sm font-semibold text-neutral-100"
            >
              {user.organization.name}
            </p>
          </div>
        </div>

       
        <UserBadge firstName={user.username} />

      </div>
    </header>
  );
};

export default Header;
