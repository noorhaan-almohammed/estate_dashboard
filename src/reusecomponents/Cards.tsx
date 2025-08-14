import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CardProps {
  id: string;
  title: string;
  description?: string;
  imageUrls?: string[];
  imagePosition?: "top" | "left" | "right" | "bottom" | "background";
  imageSize?: "small" | "medium" | "large" | "full";
  imageShape?: "rectangle" | "rounded" | "circle";
  
  metadata?: {
    label?: string;
    value?: string | number;
    icon?: string;
    date?: string;
    rating?: number;
    features?: string[];
    contact?: {
      phone?: string;
      email?: string;
    };
    location?: string;
    profileImage?: string;
    position?: string;
  };
  
  viewLink?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  
  cardStyle?: "default" | "elevated" | "outline" | "minimal";
  hoverEffect?: boolean;
  className?: string;
  index?: number;
}

export default function Card({
  title,
  description,
  imageUrls,
  imagePosition = "top",
  imageSize = "medium",
  imageShape = "rectangle",
  metadata,
  viewLink,
  onEdit,
  onDelete,
  cardStyle = "default",
  hoverEffect = true,
  className = "",
  index = 0, 
}: CardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const getImageClasses = () => {
    let classes = "object-cover transition-transform duration-300 ";
    
    if (imageSize === "small") classes += "w-16 h-16 ";
    else if (imageSize === "medium") classes += "w-32 h-32 ";
    else if (imageSize === "large") classes += "w-48 h-48 ";
    else if (imageSize === "full") classes += "w-full h-full ";
    
    if (imageShape === "rounded") classes += "rounded-lg ";
    else if (imageShape === "circle") classes += "rounded-full ";
    
    return classes;
  };

  const getCardClasses = () => {
    let classes = "rounded-xl p-4 flex flex-col ";
    
    if (cardStyle === "default") classes += "bg-white dark:bg-darkGray border border-borderColor ";
    else if (cardStyle === "elevated") classes += "bg-white dark:bg-darkGray shadow-lg ";
    else if (cardStyle === "outline") classes += "border border-borderColor ";
    else if (cardStyle === "minimal") classes += "bg-transparent ";
    
    if (hoverEffect) classes += "transition-all duration-300 ";
    
    if (imagePosition === "left") classes += "flex-row gap-4 ";
    else if (imagePosition === "right") classes += "flex-row-reverse gap-4 ";
    
    return classes + className;
  };

  const renderRating = () => {
    if (!metadata?.rating) return null;
    
    return (
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <motion.span 
            key={i} 
            className="text-xl"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {i < metadata.rating! ? '★' : '☆'}
          </motion.span>
        ))}
      </div>
    );
  };

  const renderFeatures = () => {
    if (!metadata?.features?.length) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {metadata.features.slice(0, 3).map((feature, idx) => (
          <motion.span 
            key={idx}
            className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {feature}
          </motion.span>
        ))}
        {metadata.features.length > 3 && (
          <motion.span 
            className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            +{metadata.features.length - 3} more
          </motion.span>
        )}
      </div>
    );
  };

  const renderContactInfo = () => {
    if (!metadata?.contact) return null;
    
    return (
      <div className="mt-4 space-y-2">
        {metadata.contact.phone && (
          <p className="text-sm"><strong>Phone:</strong> {metadata.contact.phone}</p>
        )}
        {metadata.contact.email && (
          <p className="text-sm"><strong>Email:</strong> {metadata.contact.email}</p>
        )}
      </div>
    );
  };

  const renderImage = () => {
    if (!imageUrls?.length) return null;
    
    if (imagePosition === "background") {
      return (
        <motion.div 
          className="relative h-48 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.img
            src={imageUrls[0]}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.div 
        className={`flex ${imagePosition === "top" || imagePosition === "bottom" ? "justify-center" : ""}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={imageUrls[0]}
          alt={title}
          className={getImageClasses()}
        />
      </motion.div>
    );
  };

  const renderViewButton = () => {
    if (!viewLink) return null;
    
    return (
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link 
          to={viewLink} 
          className="animated-gradient-text cursor-pointer"
        >
          View Details...
        </Link>
      </motion.div>
    );
  };

  const renderActionButtons = () => {
    if (!onEdit && !onDelete) return null;
    
    return (
      <div className="flex gap-3">
        {onEdit && (
          <motion.button
            onClick={onEdit}
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit
          </motion.button>
        )}
        {onDelete && (
          <motion.button
            onClick={onDelete}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Delete
          </motion.button>
        )}
      </div>
    );
  };

  return (
    <motion.div
      className={getCardClasses()}
      variants={hoverEffect ? { ...cardVariants, ...hoverVariants } : cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      {(imagePosition === "top" || imagePosition === "background") && renderImage()}
      
      <div className="flex-1">
        <motion.h3 
          className="text-lg font-semibold mb-2"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {description}
          </p>
        )}
        
        {metadata?.label && (
          <motion.p 
            className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {metadata.label}
          </motion.p>
        )}
        
        {metadata?.value && (
          <motion.p 
            className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {metadata.value}
          </motion.p>
        )}
        
        {metadata?.date && (
          <p className="text-sm text-gray-500 mb-3">
            {new Date(metadata.date).toLocaleDateString()}
          </p>
        )}
        
        {renderRating()}
        {renderFeatures()}
        {renderContactInfo()}
        
        <motion.div 
          className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {renderViewButton()}
          {renderActionButtons()}
        </motion.div>
      </div>
      
      {imagePosition === "bottom" && renderImage()}
    </motion.div>
  );
}