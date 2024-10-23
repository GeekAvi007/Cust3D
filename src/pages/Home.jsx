import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { 
  headContainerAnimation,
  headContentAnimation,
  slideAnimation
} from '../config/motion'
import state from '../store'
import { CustomButton } from '../components'

const Home = () => {
  const snap = useSnapshot(state)
  const textRef = useRef(null)

  // GSAP letter-by-letter text animation
  useEffect(() => {
    if (snap.intro) {
      const letters = textRef.current.querySelectorAll('span') // Target each span (letter)
      gsap.fromTo(
        letters,
        { opacity: 0, y: 50 },  // Start with letters invisible and below their position
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: 'back.out(1.7)',  // Smooth ease with a bounce effect
          stagger: 0.1 // Staggering each letter by 0.1 seconds
        }
      )
    }
  }, [snap.intro])

  // Function to split text into individual letters wrapped in spans
  const splitText = (text) => (
    text.split('').map((letter, index) => (
      <span key={index} className="inline-block">{letter === ' ' ? '\u00A0' : letter}</span>
    ))
  )

  return (
    <AnimatePresence>
      {snap.intro && (
        <section className='home'>
          <motion.header {...slideAnimation('down')}>
            <img
              src='./threejs.png'
              alt='logo'
              className='w-8 h-8 object-contain'
            />
          </motion.header>
          
          <motion.div className='home-content' {...headContainerAnimation}>
            <div>
              {/* GSAP will handle the letter-by-letter animation */}
              <h1 ref={textRef} className='head-text text-gray-500'>
                {/* Split "MAKE" and then move "IT FUN" to the next line */}
                {splitText('MAKE')} <br />
                {splitText('IT FUN')}
              </h1>
            </div>
            
            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
              <p className='max-w-md font-normal text-white text-base'>
                Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your Imagination</strong>{" "} and define your own style.
              </p>
              <CustomButton 
                type="filled"
                title="Customize It"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  )
}

export default Home