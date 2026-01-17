import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../App";

const useUserAuth = () => {
  const { setUserData,userData } = useContext(UserContext);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/dashboard/`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setUserData(response.data.info);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setUserData(null);
        navigate("/login");
      }
    };

    fetchUserInfo();

    console.log(userData);
  }, [userData, navigate]);
};

export default useUserAuth;
