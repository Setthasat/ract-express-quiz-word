
function Background() {
  return (
 <div 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{
        backgroundImage: `url('https://cdn.svgator.com/images/2022/06/animated-svg-background-example.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}

export default Background
