import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ImageSlider from "../components/ImageSlider";
import InfoItem from "../components/InfoItem";
import LoadingSpinner from "./LoadingSpinner";

interface SharedDetailsPageProps {
  collectionName: string;
  backLink: string;
  backLinkText: string;
  titleField?: string;
  imageFields?: string[];
  customComponents?: {
    [key: string]: (value: any) => React.ReactNode;
  };
  emptyStateText?: string;
}

export default function SharedDetailsPage({
  collectionName,
  backLink,
  backLinkText,
  titleField = "title",
  imageFields = [],
  customComponents = {},
  emptyStateText = "Item not found",
}: SharedDetailsPageProps) {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, collectionName, id!);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error(`Error fetching ${collectionName}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [collectionName, id]);

   

  const renderField = (key: string, value: any) => {
    if (customComponents[key]) {
      return customComponents[key](value);
    }

    if (key.endsWith('At') && value?.seconds) {
      return new Date(value.seconds * 1000).toLocaleString();
    }

    if (key === 'date' && (value?.seconds || value instanceof Date)) {
      return new Date(value.seconds ? value.seconds * 1000 : value).toLocaleDateString();
    }

    if (key === 'rating') {
      return (
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <motion.span 
              key={i} 
              className="text-2xl text-yellow-500"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {i < value ? '★' : '☆'}
            </motion.span>
          ))}
        </div>
      );
    }

    return value || "-";
  };

  if (loading) return <LoadingSpinner />;
  if (!item) return (
    <motion.p 
      className="text-center text-red-600 mt-8 text-xl "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {emptyStateText}
    </motion.p>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-full mx-auto p-6 space-y-8 bg-bg min-h-screen"
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to={backLink}
          className="inline-flex items-center gap-2 font-semibold cursor-pointer px-4 py-2 rounded-full text-lg bg-mainPurple text-white hover:bg-hoverPurple transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {backLinkText}
        </Link>
      </motion.div>

      {imageFields.map(field => (
        item[field]?.length > 0 && (
          <motion.div 
            key={field} 
            className="mb-8 rounded-xl overflow-hidden "
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ImageSlider images={item[field]} />
          </motion.div>
        )
      ))}

      {item.profileImage && (
        <motion.div 
          className="flex justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <img
            src={item.profileImage}
            alt={item.name || item.title}
            className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl"
          />
        </motion.div>
      )}

      <motion.h1 
        className="text-4xl font-bold bg-gradient-to-r from-mainPurple to-blue-600 bg-clip-text text-transparent"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {item[titleField]}
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {Object.entries(item)
          .filter(([key]) => ![
            'id', 
            'createdAt', 
            'updatedAt', 
            'description', 
            'features', 
            ...imageFields,
            'profileImage',
            'profileimage',
            titleField
          ].includes(key))
          .map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
            >
              <InfoItem 
                label={key.replace(/_/g, ' ')}
                value={renderField(key, value)}
              />
            </motion.div>
          ))}
      </motion.div>

      {item.description && (
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-mainPurple">Description</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      )}

      {item.features?.length > 0 && (
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-mainPurple">Features</h2>
          <ul className="space-y-2">
            {item.features.map((feature: string, idx: number) => (
              <motion.li 
                key={idx}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                whileHover={{ x: 5 }}
              >
                <span className="text-mainPurple mt-1">•</span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <InfoItem
          label="Created At"
          value={item.createdAt?.seconds 
            ? new Date(item.createdAt.seconds * 1000).toLocaleString() 
            : "-"}
        />
        {item.updatedAt && (
          <InfoItem
            label="Updated At"
            value={item.updatedAt?.seconds 
              ? new Date(item.updatedAt.seconds * 1000).toLocaleString() 
              : "-"}
          />
        )}
      </motion.div>
    </motion.div>
  );
}