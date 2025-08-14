import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Form, { InputField } from "../../reusecomponents/FormAdd";

interface AddFaqModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddFaqModal = ({ onClose, onSuccess }: AddFaqModalProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "faqs"), {
        question,
        answer,
        createdAt: serverTimestamp(),
      });
      onSuccess();
    } catch (error) {
      console.error("Error adding FAQ:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      title="Add New FAQ"
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={isSubmitting}
      submitText="Save"
    >
      <InputField
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter question"
        required
      />
      <InputField
        name="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter answer"
        rows={4}
        required
      />
    </Form>
  );
};

export default AddFaqModal;