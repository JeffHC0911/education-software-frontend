/* eslint-disable react/prop-types */
import {NavbarComponent} from '../index'

export const TeacherLayout = ({children}) => {
  return (
    <div>
        <nav>
            <NavbarComponent />
        </nav>

        <main className='text-center text-lg mt-4 flex flex-col items-center'>
            <div className='flex flex-row justify-around flex-wrap'>
                {children}
            </div>

        </main>

        <footer>

        </footer>
    </div>
  )
}
