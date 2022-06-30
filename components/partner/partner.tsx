import { useContext } from 'react'
import { getTranslation } from '../../lib/wp/translations'
import AppContext from '../../store/AppContext'
import { Page, PartnerType } from '../../store/types'
import styles from '../../styles/pageDefault.module.scss'
import HomePartner from '../home/partner'
import HomeSection from '../home/section'
import PartnerLocal from './partnerLocal'
const Partner = (info: { data: PartnerType[]; page: Page }) => {
  const { state } = useContext(AppContext)
  const { data } = info
  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.pageContentContainer}>
          <HomeSection
            title={getTranslation(
              state?.translations,
              'sponsor_sostenuto_da',
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) => partner.type === 'sostenuto-da'
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              'sponsor_collaborazione_contributo',
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) => partner.type === 'collaborazioni'
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              'sponsor_patrocinio',
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) => partner.type === 'patrocinio'
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              'sponsor_collaborazione',
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) =>
                  partner.type === 'in-collaborazione-con'
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              'sponsor_tecnici',
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) =>
                  partner.type === 'sponsor-tecnici'
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              'sponsor_media',
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <HomePartner
              data={data.filter(
                (partner: { type: string }) =>
                  partner.type === 'media-technical-partner'
              )}
            />
          </HomeSection>
          <HomeSection
            title={getTranslation(
              state?.translations,
              'sponsor_locali',
              state?.language
            )}
            showButton={false}
            paddingY={50}
          >
            <PartnerLocal
              data={data.filter(
                (partner: { type: string }) => partner.type === 'sponsor-locali'
              )}
            />
          </HomeSection>
        </div>
      </div>
    </>
  )
}

export default Partner
