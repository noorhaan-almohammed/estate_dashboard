import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AddFaqModal from "../../components/modals/AddFaqModal";
import EditFaqModal from "../../components/modals/EditFaqModal";
import FAQList from "../../components/lists/FAQListPage";
import ReusableDataPage from "../../reusecomponents/TpoSectionPage";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt?: Date;
}


export default function FAQsPage() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const faqsRef = collection(db, "faqs");
    const q = query(faqsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: FAQ[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as FAQ);
        });
        setFaqs(items);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching FAQs:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  

  return (
 
     <ReusableDataPage
          collectionName="faqs"
          pageTitle="All faqs"
          addButtonText="+ Add faq"
          ListComponent={FAQList}
          AddModalComponent={AddFaqModal}
          EditModalComponent={EditFaqModal}
        />
  );
}