import './Body.css';
import { motion } from "framer-motion";
import HomeCard from '../../uitl/HomeCard';
import Cat from '../../../assets/cat.jpg';

function Body(props: any) {
  function handleTogglePopup() {
    props.setTogglePopup(!props.togglePopup);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="gap-4 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <HomeCard onClick={handleTogglePopup} imgSrc={Cat}>Add Word</HomeCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <HomeCard href="/words" imgSrc={Cat}>Word Lists</HomeCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <HomeCard imgSrc={Cat}>Quiz Word</HomeCard>
        </motion.div>
      </div>
    </div>
  );
}

export default Body;