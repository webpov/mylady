import Image from 'next/image'
import styles from './page.module.css'
import { GameContainer } from '@/GameContainer'

export default function Home() {
  return (
    <main className={`${styles.main}  `}>
      
      <div className='gbg-glass z-100  block w-100 block pos-abs h-100 noclick nopointer'>
</div>
      <GameContainer />
    </main>
  )
}
