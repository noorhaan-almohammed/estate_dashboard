import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, ErrorIcon, LoginIcon, LoadingSpinner } from "./Icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("isLoggedIn");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const validUsername = "admin";
      const validPassword = "123456";

      if (username === validUsername && password === validPassword) {
        sessionStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setError("User Name Or Password is Uncorrect");
      }
      setIsLoading(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.2, 0.3, 0.2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 30
      }
    },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg overflow-hidden relative">
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-mainPurple opacity-50 blur-2xl"
        variants={pulseVariants}
        initial="animate"
        animate="animate"
      />
      
      <motion.div
        className="absolute top-10 right-10 w-52 h-52 rounded-full bg-secPurple opacity-50 blur-2xl"
        variants={floatVariants}
        initial="animate"
        animate="animate"
        transition={{ delay: 1 }}
      />
      
      <motion.div
        className="absolute bottom-10 left-1/4 w-64 h-64 rounded-full bg-[#ec4899] opacity-50 blur-2xl"
        variants={floatVariants}
        initial="animate"
        animate="animate"
        transition={{ delay: 2 }}
      />
      
      <motion.div
        className="w-full max-w-md bg-darkGray border border-borderColor shadow-2xl rounded-2xl p-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-br from-mainPurple to-secPurple flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(112, 59, 247, 0.4)",
                "0 0 0 10px rgba(112, 59, 247, 0)",
                "0 0 0 0 rgba(112, 59, 247, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <UserIcon className="h-8 w-8 text-mainText" />
          </motion.div>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-bold text-center animated-gradient-text mb-2"
          variants={itemVariants}
        >
          LogIn
        </motion.h2>
        
        <motion.p 
          className="text-secText text-center mb-6"
          variants={itemVariants}
        >
          Welcome back.. Please enter your information
        </motion.p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            <label className="text-secText text-sm font-medium">User Name</label>
            <motion.input
              type="text"
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-bg border border-borderColor rounded-xl text-mainText focus:ring-2 focus:ring-mainPurple focus:border-transparent transition-all duration-300"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            <label className="text-secText text-sm font-medium">Password</label>
            <motion.input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-bg border border-borderColor rounded-xl text-mainText focus:ring-2 focus:ring-mainPurple focus:border-transparent transition-all duration-300"
              required
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.div
                className="p-3 bg-red-900/30 border border-red-700 rounded-xl text-red-400 text-sm flex items-center"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ErrorIcon className="h-5 w-5 ml-2" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button 
            type="submit" 
            className="w-full bg-gradient-to-r from-mainPurple to-mainPurple text-mainText p-3 rounded-xl disabled:opacity-50 flex items-center justify-center shadow-lg relative overflow-hidden group cursor-pointer"
            disabled={isLoading}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-mainPurple/0 via-white/20 to-mainPurple/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            
            {isLoading ? (
              <>
                <LoadingSpinner className="-ml-1 mr-3 h-5 w-5 text-white" />
                loading...
              </>
            ) : (
              <>
                <LoginIcon className="h-5 w-5 ml-2" />
                Login
              </>
            )}
          </motion.button>
        </form>
        
        <motion.div 
          className="mt-6 p-4 bg-bg/50 border border-borderColor rounded-xl"
          variants={itemVariants}
        >
          <p className="text-secText text-sm text-center mb-2">LogIn Data: </p>
          <div className="flex justify-between text-xs">
            <div className="flex items-center">
              <span className="text-mainText font-medium">User Name: </span>
              <span className="text-secPurple font-bold ">admin</span>
            </div>
            <div className="flex items-center justify-between ">
              <span className="text-mainText font-medium">Password: </span>
              <span className="text-secPurple font-bold">123456</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;