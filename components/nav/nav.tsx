import cls from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useMemo, useState } from 'react'
import Div100vh from 'react-div-100vh'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { getTranslation } from '../../lib/wp/translations'
import AppContext from '../../store/AppContext'
import styles from './nav.module.scss'

const Nav = () => {
  const context = useContext(AppContext)
  const { state, setIsMainMenuOpen } = context
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const closeMenu = () => {
    if (setIsMainMenuOpen) setIsMainMenuOpen(false)
  }

  const menus = useMemo(
    () => [
      {
        class: 'main',
        title: getTranslation(
          state?.translations,
          'menu_edizione',
          state?.language
        ),
        menu: [
          {
            name: getTranslation(
              state?.translations,
              'menu_ospiti',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_ospiti',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_programma',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_programma',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_laboratori',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_laboratori',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_mostre',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_mostre',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_news',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_news',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_sponsor',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_sponsor',
              state?.language,
              'link'
            ),
          },
        ],
      },
      {
        class: 'visitatori',
        title: getTranslation(
          state?.translations,
          'menu_info_visitatori',
          state?.language
        ),
        menu: [
          {
            name: getTranslation(
              state?.translations,
              'menu_come_fare',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_come_fare',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_dove_dormire',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_dove_dormire',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_dove_mangiare',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_dove_dormire',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_sostieni_lisola',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_sostieni_lisola',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_contatti',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_contatti',
              state?.language,
              'link'
            ),
          },
        ],
      },
      {
        class: 'chisiamo',
        title: getTranslation(
          state?.translations,
          'menu_chi_siamo',
          state?.language
        ),
        menu: [
          {
            name: getTranslation(
              state?.translations,
              'menu_associazione',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_associazione',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_festival',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_festival',
              state?.language,
              'link'
            ),
          },
          {
            name: getTranslation(
              state?.translations,
              'menu_luogo',
              state?.language
            ),
            url: getTranslation(
              state?.translations,
              'menu_luogo',
              state?.language,
              'link'
            ),
          },
        ],
      },
    ],
    [state?.language, state?.translations]
  )

  const changeLeft = () => {
    let newPosition = currentPosition - 1
    if (newPosition < 0) newPosition = menus.length - 1

    setCurrentPosition(newPosition)
  }

  const changeRight = () => {
    let newPosition = currentPosition + 1
    if (newPosition > menus.length - 1) newPosition = 0

    setCurrentPosition(newPosition)
  }

  const [currentMenu, setCurrentMenu] = useState(menus[0])
  const [currentPosition, setCurrentPosition] = useState(0)

  useEffect(() => {
    const menu = menus[currentPosition]
    setCurrentMenu(menu)
  }, [currentPosition, menus])

  return (
    <Div100vh
      className={cls(styles.nav, state?.isMainMenuOpen ? styles.visible : '')}
    >
      <div className={styles.navCointainer}>
        <div className={styles.navHeader}>
          <div className={styles.langMenu}>
            <Link
              href={getTranslation(
                state?.translations,
                'menu_lingua',
                state?.language,
                'link'
              )}
              locale={state?.language === 'it' ? 'en' : 'it'}
            >
              <a onClick={closeMenu}>
                {getTranslation(
                  state?.translations,
                  'menu_lingua',
                  state?.language
                )}
              </a>
            </Link>
          </div>

          <div className={styles.logoContainer}>
            <Link href="/">
              <a onClick={closeMenu}>
                <Image
                  src="/images/l-isola-delle-storie-logo-xvii-oriz.svg"
                  layout="fill"
                  alt="L’Isola delle Storie 2022"
                  className={styles.logo}
                  priority
                />
              </a>
            </Link>
          </div>
        </div>
        {isMobile && (
          <>
            <div className={styles.menuContainer}>
              <div className={cls(styles.menu, styles.visitatori)}>
                <h2>{currentMenu.title}</h2>
                <ul>
                  {currentMenu?.menu?.map((menu) => {
                    return (
                      <li key={uuidv4()}>
                        <Link href={menu.url}>
                          <a onClick={closeMenu}>{menu.name}</a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <a onClick={changeLeft} className={styles.left}>
                <IoIosArrowDropleft className="w-7 h-7" />
              </a>
              <a onClick={changeRight} className={styles.right}>
                <IoIosArrowDropright className="w-7 h-7" />
              </a>
            </div>
          </>
        )}
        <div className={styles.navFooter}>
          {' '}
          <div className={styles.langMenu}>
            <Link
              href={getTranslation(
                state?.translations,
                'menu_lingua',
                state?.language,
                'link'
              )}
              locale={state?.language === 'it' ? 'en' : 'it'}
            >
              <a onClick={closeMenu}>
                {getTranslation(
                  state?.translations,
                  'menu_lingua',
                  state?.language
                )}
              </a>
            </Link>
          </div>
        </div>
        {!isMobile && (
          <>
            {' '}
            <div className={styles.menuContainer}>
              <div className={cls(styles.menu, styles.visitatori)}>
                <h2>
                  {getTranslation(
                    state?.translations,
                    'menu_info_visitatori',
                    state?.language
                  )}
                </h2>
                <ul>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_come_fare',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_come_fare',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_dove_dormire',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_dove_dormire',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_dove_mangiare',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_dove_mangiare',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_sostieni_lisola',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_sostieni_lisola',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_contatti',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_contatti',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={cls(styles.menu, styles.main)}>
                <h2>
                  {getTranslation(
                    state?.translations,
                    'menu_edizione',
                    state?.language
                  )}
                </h2>
                <ul>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_ospiti',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_ospiti',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_programma',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_programma',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_laboratori',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_laboratori',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_mostre',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_mostre',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_news',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_news',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_sponsor',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_sponsor',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={cls(styles.menu, styles.chisiamo)}>
                <h2>
                  {getTranslation(
                    state?.translations,
                    'menu_chi_siamo',
                    state?.language
                  )}
                </h2>
                <ul>
                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_associazione',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_associazione',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_festival',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_festival',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={getTranslation(
                        state?.translations,
                        'menu_luogo',
                        state?.language,
                        'link'
                      )}
                    >
                      <a onClick={closeMenu}>
                        {getTranslation(
                          state?.translations,
                          'menu_luogo',
                          state?.language
                        )}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </Div100vh>
  )
}

export default Nav
