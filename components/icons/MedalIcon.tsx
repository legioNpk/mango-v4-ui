const MedalIcon = ({
  className,
  rank,
}: {
  className?: string
  rank: number
}) => {
  const medalColors = ['#FFCF40', '#C7C7C7', '#DBA36B']
  console.log(rank)
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 41 40"
    >
      <defs>
        {/* <linearGradient
            gradientTransform="rotate(150, 0.5, 0.5)"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="ffflux-gradient"
          >
            <stop
              stopColor={medalColors[rank - 1].light}
              stopOpacity="1"
              offset="0%"
            ></stop>
            <stop
              stopColor={medalColors[rank - 1].dark}
              stopOpacity="1"
              offset="100%"
            ></stop>
          </linearGradient> */}
        {/* <filter
            id="ffflux-filter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005 0.003"
              numOctaves="2"
              seed="2"
              stitchTiles="stitch"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              result="turbulence"
            ></feTurbulence>
            <feGaussianBlur
              stdDeviation="20 0"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="turbulence"
              edgeMode="duplicate"
              result="blur"
            ></feGaussianBlur>
            <feBlend
              mode="color-dodge"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              in2="blur"
              result="blend"
            ></feBlend>
          </filter> */}
      </defs>
      <path
        d="M39.4976 22.5643H39.5039C39.3431 22.2203 39.2124 21.8366 39.1199 21.4217C38.804 20.0252 38.9791 18.5701 39.5054 17.4376H39.4976C40.1013 16.3684 40.2648 15.0721 39.8425 13.8221C39.4202 12.5721 38.4959 11.6151 37.3534 11.0914L37.3586 11.0878C37.0175 10.8997 36.6804 10.6629 36.3506 10.3811C35.2425 9.42877 34.4956 8.15084 34.2293 6.93991L34.2229 6.94354C34.0693 5.82411 33.4911 4.76075 32.5273 3.99682C32.4511 3.93711 32.374 3.87852 32.2929 3.82216C31.1883 3.04816 29.8559 2.7993 28.612 3.02137L28.6135 3.01523C28.2228 3.0543 27.8057 3.05541 27.3669 3.01272C25.8884 2.86875 24.5039 2.25965 23.5478 1.42815L23.5454 1.43541C22.6745 0.552905 21.4433 0.000976562 20.0779 0.000976562C18.7122 0.000976562 17.4825 0.552877 16.6112 1.43541L16.6089 1.42676C16.3159 1.68066 15.9788 1.92006 15.5983 2.13239C14.3149 2.85139 12.8228 3.14296 11.5409 3.01132L11.5446 3.02109C10.3006 2.79899 8.96688 3.04787 7.8638 3.82187C7.0966 4.35647 6.54272 5.07301 6.22189 5.86509C6.07987 6.21163 5.98336 6.57435 5.93264 6.94294L5.92627 6.93792C5.84656 7.3079 5.71701 7.69099 5.53963 8.07935C4.94113 9.38792 3.91168 10.4669 2.79435 11.0846L2.80188 11.0908C1.66081 11.6145 0.735125 12.5715 0.31428 13.8215C-0.109162 15.0715 0.0554584 16.3678 0.659177 17.437H0.650193C0.811341 17.7838 0.940607 18.1658 1.03451 18.5796C1.35014 19.9771 1.17508 21.4333 0.650193 22.5639H0.659177C0.0554584 23.6356 -0.109133 24.9319 0.31428 26.1819C0.735407 27.4319 1.66081 28.3887 2.80188 28.9113L2.79551 28.9163C3.13664 29.1041 3.47517 29.3412 3.80206 29.6245C4.91153 30.5767 5.65847 31.8532 5.92447 33.0667L5.932 33.0594C5.96127 33.262 6.00301 33.462 6.05894 33.6601C6.33284 34.6392 6.94412 35.5401 7.86312 36.1819C8.54654 36.6579 9.31753 36.9386 10.1012 37.0265C10.5843 37.0829 11.0701 37.0681 11.544 36.9824L11.5413 36.9897C11.932 36.9506 12.3502 36.9481 12.7879 36.9922C14.2652 37.1361 15.6497 37.7441 16.6071 38.5767L16.6108 38.567C17.4821 39.4509 18.7118 40 20.0775 40C21.4429 40 22.6741 39.4509 23.5454 38.567L23.5465 38.572C23.8395 38.3181 24.1769 38.0812 24.5586 37.8689C25.8417 37.1487 27.3329 36.858 28.6145 36.9899L28.6119 36.9827C28.7667 37.0095 28.92 37.0315 29.0771 37.0438C30.1817 37.1339 31.3254 36.8582 32.2928 36.1822C33.1473 35.584 33.7371 34.7662 34.035 33.8655C34.1236 33.6018 34.1845 33.3331 34.2228 33.0597L34.228 33.0647C34.308 32.6937 34.4361 32.3105 34.6146 31.9222C35.2146 30.6136 36.2441 29.5343 37.3611 28.9169L37.3533 28.9119C38.4957 28.3893 39.4203 27.43 39.8423 26.1825C40.2646 24.9322 40.101 23.6334 39.4976 22.5643Z"
        fill={medalColors[rank - 1]}
        // filter="url(#ffflux-filter)"
      />
    </svg>
  )
}

export default MedalIcon

{
  /* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700"><defs><linearGradient gradientTransform="rotate(150, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="hsl(315, 100%, 72%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(227, 100%, 50%)" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.005 0.003" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
    <feGaussianBlur stdDeviation="20 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
    <feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
    
  </filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg> */
}
