import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const statsAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  return (
    <section id="about" className="about">
      <motion.h2 
        className="section-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        Hakkımda
      </motion.h2>
      <div className="about-content">
        <motion.div 
          className="about-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Merhaba! Ben Enes, tutkulu bir full-stack developer ve UI/UX
            tasarımcısıyım. Modern web teknolojileri ile çalışmayı ve kullanıcı
            deneyimini en üst düzeye çıkarmayı hedefliyorum.
          </motion.p>
          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            1 yıllık deneyimimle, React, Vue.js, Next.js gibi modern frontend
            teknolojilerinin yanı sıra Node.js, Express.js ve MongoDB gibi
            backend teknolojilerini kullanarak ölçeklenebilir ve performanslı
            web uygulamaları geliştiriyorum.
          </motion.p>
          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Kullanıcı odaklı tasarım prensiplerini benimseyerek, hem görsel
            açıdan etkileyici hem de kullanımı kolay arayüzler oluşturuyorum.
            Backend tarafında ise güvenli, hızlı ve verimli veri yönetimi
            sağlayarak tam donanımlı uygulamalar geliştiriyorum. Sürekli
            öğrenmeye ve kendimi geliştirmeye açık bir yaklaşım benimsiyorum.
            Yeni teknolojileri takip ediyor ve projelerimde en güncel çözümleri
            uygulamaya çalışıyorum. Full-stack geliştirme sürecinde API
            entegrasyonu, veritabanı yönetimi, state management ve performans
            optimizasyonu gibi konulara özellikle önem veriyorum. Eğer modern ve
            kullanıcı dostu web uygulamaları geliştirmek için bir iş birliği
            yapmak isterseniz, benimle iletişime geçebilirsiniz!
          </motion.p>
        </motion.div>
        <motion.div 
          className="about-stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="stat-item"
            variants={statsAnimation}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="stat-number"
              initial={{ color: "#333" }}
              whileHover={{ color: "#007bff" }}
            >1+</motion.span>
            <span className="stat-label">Yıl Deneyim</span>
          </motion.div>
          <motion.div 
            className="stat-item"
            variants={statsAnimation}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="stat-number"
              initial={{ color: "#333" }}
              whileHover={{ color: "#007bff" }}
            >5+</motion.span>
            <span className="stat-label">Tamamlanan Proje</span>
          </motion.div>
          <motion.div 
            className="stat-item"
            variants={statsAnimation}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="stat-number"
              initial={{ color: "#333" }}
              whileHover={{ color: "#007bff" }}
            >1+</motion.span>
            <span className="stat-label">Mutlu Müşteri</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
