

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface CardProps {
  id: string;
  title: string;
  subtitle?: string;
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
    dateIcon?: string;
    rating?: number;
    features?: {
      text: string;
      icon?: string;
    }[];
    contact?: {
      phone?: string;
      phoneIcon?: string;
      email?: string;
      emailIcon?: string;
    };
    location?: string;
    locationIcon?: string;
    profileImage?: string;
    position?: string;
    positionIcon?: string;
    categoryIcon?: string;
    domainIcon?: string;
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
  subtitle,
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
  // index = 0,
}: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // const cardVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       delay: index * 0.1,
  //       duration: 0.5,
  //       ease: "easeOut"
  //     }
  //   }
  // };

  // const hoverVariants = {
  //   hover: {
  //     scale: 1.03,
  //     boxShadow: "0 10px 25px -5px rgba(112, 59, 247, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  //     transition: { 
  //       duration: 0.3,
  //       ease: "easeOut"
  //     }
  //   }
  // };

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
    let classes = "rounded-xl overflow-hidden flex flex-col h-full ";
    
    if (cardStyle === "default") classes += "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ";
    else if (cardStyle === "elevated") classes += "bg-white dark:bg-darkGray shadow-md dark:shadow-lg ";
    else if (cardStyle === "outline") classes += "border-2 border-gray-300 dark:border-gray-600 ";
    else if (cardStyle === "minimal") classes += "bg-transparent border-none shadow-none ";

    if (hoverEffect) classes += "transition-all duration-300 ease-out ";

    if (imagePosition === "left") classes += "flex-row gap-4 ";
    else if (imagePosition === "right") classes += "flex-row-reverse gap-4 ";

    return classes + " " + className;
  };

  const renderRating = () => {
    if (!metadata?.rating) return null;

    return (
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className={`text-lg ${i < metadata.rating! ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ★
          </motion.span>
        ))}
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          {metadata.rating}/5
        </span>
      </div>
    );
  };

  const renderLabel = () => {
    if (!metadata?.label) return null;

    return (
      <motion.div
        className="flex items-center mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {metadata.categoryIcon && (
          <span className="mr-2 text-purple-500 dark:text-purple-400">
            <i className={metadata.categoryIcon} />
          </span>
        )}
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {metadata.label}
        </span>
      </motion.div>
    );
  };

  const renderValue = () => {
    if (!metadata?.value) return null;

    return (
      <motion.div
        className="flex items-center mb-3"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {metadata.domainIcon && (
          <span className="mr-2 text-blue-500 dark:text-blue-400">
            <i className={metadata.domainIcon} />
          </span>
        )}
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          {metadata.value}
        </span>
      </motion.div>
    );
  };

  const renderDate = () => {
    if (!metadata?.date) return null;

    return (
      <div className="flex items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
        {metadata.dateIcon && (
          <span className="mr-2">
            <i className={metadata.dateIcon} />
          </span>
        )}
        {new Date(metadata.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
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
            className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {feature.icon && (
              <span className="mr-1 text-blue-500">
                <i className={feature.icon} />
              </span>
            )}
            {feature.text}
          </motion.span>
        ))}
        {metadata.features.length > 3 && (
          <motion.span
            className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full"
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
      <div className="mt-3 space-y-2">
        {metadata.contact.phone && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            {metadata.contact.phoneIcon && (
              <span className="mr-2 text-green-500">
                <i className={metadata.contact.phoneIcon} />
              </span>
            )}
            <span>{metadata.contact.phone}</span>
          </div>
        )}
        {metadata.contact.email && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            {metadata.contact.emailIcon && (
              <span className="mr-2 text-blue-500">
                <i className={metadata.contact.emailIcon} />
              </span>
            )}
            <span>{metadata.contact.email}</span>
          </div>
        )}
      </div>
    );
  };

  const renderImage = () => {
    if (!imageUrls?.length) return null;

    if (imagePosition === "background") {
      return (
        <motion.div
          className="relative h-56 overflow-hidden group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.img
            src={imageUrls[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            initial={{ scale: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <motion.h2 
              className="text-2xl font-bold text-white mb-1"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.h3
                className="text-lg font-medium text-white/90"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.45 }}
              >
                {subtitle}
              </motion.h3>
            )}
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
          className="animated-gradient-text cursor-pointer flex items-center gap-2"
        >
          View Details
          <i className="fas fa-eye text-xs" />
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
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 cursor-pointer flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-edit text-green-400" />
            Edit
          </motion.button>
        )}
        {onDelete && (
          <motion.button
            onClick={onDelete}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 cursor-pointer flex items-center gap-2 "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-trash text-red-500" />
            Delete
          </motion.button>
        )}
      </div>
    );
  };

  const renderDescription = () => {
    if (!description) return null;

    const isLongDescription = description.length > 150;

    return (
      <div className="relative">
        <p className={`text-gray-600 dark:text-gray-300 mb-2 ${!showFullDescription && isLongDescription ? 'line-clamp-3' : ''}`}>
          {description}
        </p>
        {isLongDescription && (
          <motion.button
            onClick={() => {
              setIsFlipped(!isFlipped);
              setShowFullDescription(!showFullDescription);
            }}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 cursor-pointer text-sm flex items-center gap-1 mb-5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showFullDescription ? 'Read Less' : 'Read More'}
            <i className={`fas fa-${showFullDescription ? 'minus' : 'plus'} text-xs`} />
          </motion.button>
        )}
      </div>
    );
  };

  const renderFrontContent = () => (
    <div className="flex-1 p-6 flex flex-col bg-darkGray">
      {imagePosition !== "background" && (
        <div className="mb-4">
          
          {subtitle && (
            <motion.h3
              className="text-lg font-medium text-purple-600 dark:text-purple-400"
              whileHover={{ x: 5 }}
            >
              {subtitle}
            </motion.h3>
          )}
          <motion.h2
            className="text-2xl font-bold text-gray-800 dark:text-white mb-1"
            whileHover={{ x: 5 }}
          >
            {title}
          </motion.h2>
        </div>
      )}

      {renderDescription()}

      <div className="space-y-3 mb-5">
        {renderLabel()}
        {renderValue()}
        {renderDate()}
        {renderRating()}
        {renderFeatures()}
        {renderContactInfo()}
      </div>

      <div className="mt-auto">
        <motion.div
          className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {renderViewButton()}
          {renderActionButtons()}
        </motion.div>
      </div>
    </div>
  );

  const renderBackContent = () => (
    <motion.div
      className="flex-1 p-6 flex flex-col h-full bg-darkGray"
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 0 }}
      transition={{ duration: 180 }}
    >
      <motion.button
        onClick={() => {
          setIsFlipped(false);
          setShowFullDescription(false);
        }}
        className="self-start mb-4 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 cursor-pointer flex items-center gap-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="fas fa-arrow-left" />
        Back
      </motion.button>

      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Full Description</h3>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {description}
        </p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className={getCardClasses()}
        // variants={hoverEffect ? { ...cardVariants, ...hoverVariants } : cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={!isFlipped ? "hover" : undefined}
        // animate={isFlipped ? "back" : "front"}
        // variants={{
        //   front: { rotateY: 0 },
        //   back: { rotateY: 180 }
        // }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        layout
      >
        {!isFlipped && (
          <>
            {(imagePosition === "top" || imagePosition === "background") && renderImage()}
            {renderFrontContent()}
            {imagePosition === "bottom" && renderImage()}
          </>
        )}

        {isFlipped && renderBackContent()}
      </motion.div>
    </motion.div>
  );
}
