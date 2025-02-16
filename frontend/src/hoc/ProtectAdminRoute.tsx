// hoc - (Higher-Order Component pattern)

import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import useAuthStore from "../stores/useAuthStore";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { checkAdminAccess, isCheckingAdmin } = useAuthStore();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const verifyAdmin = useCallback(async () => {
    const isAdmin = await checkAdminAccess();
    setHasAccess(isAdmin);
  }, [checkAdminAccess]);

  useEffect(() => {
    verifyAdmin();
  }, [verifyAdmin]);

  if (isCheckingAdmin || hasAccess === null)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader size={25} className="animate-spin" />
      </div>
    );

  return hasAccess ? children : <Navigate to="/" />;
};

export default ProtectedAdminRoute;
