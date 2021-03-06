import React, {useState} from 'react';
import { Link, graphql, useStaticQuery} from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const getLogo = graphql`
query retrieveImage {
    strapiNavigation {
        logo {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 200,
                placeholder: BLURRED
              )
            }
          }
        }
      }
  }
`
const Navigation = () => {
    const data = useStaticQuery(getLogo);
    const image = getImage(data.strapiNavigation.logo.localFile);
    // console.log(image);
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
        <nav className="h-24 flex justify-between items-center px-6">
            <Link to='/'>
                <GatsbyImage image={image} alt="this should be dynamic data" />
            </Link>
            <ul className="hidden sm:flex flex-row space-x-6">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/services'>Services</Link></li>
                <li><Link to='/testimonials'>Testimonials</Link></li>
            </ul>

            <div className="sm:hidden" role="button" tabIndex="0" onClick={handleClick}>
                <FontAwesomeIcon icon={faBars} className={`${showMenu ? "hidden" : "block"} fa-2x `}/>
            </div>

                <ul id="mobile-menu px-6"
                    role="menu"
                    tabIndex="0"
                    onClick={handleClick}
                    className= 
                    {`
                        ${showMenu ? "absolute" : "hidden"}
                        sm:hidden 
                        absolute left-0 top-0
                        h-full w-full z-10
                        bg-s-purple
                        text-gray-200 text-4xl text-center
                        flex flex-col justify-center space-y-7
                    `}
                >
                    <FontAwesomeIcon icon={faTimes} className='fixed top-2 right-6'/>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/services'>Services</Link></li>
                    <li><Link to='/testimonials'>Testimonials</Link></li>
                </ul>
        </nav>
        </>
    )
}

export default Navigation