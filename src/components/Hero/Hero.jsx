import Card from '../Card/Card'

const Hero = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center mt-[50px] gap-9'>
     <Card image="./images/CCTVFight4.png" location="Chennai"></Card>
     <Card image="./images/fight.jpeg" location="Tambaram"></Card>
     <Card image="./images/fight-2.jpeg" location="Guindy"></Card>     
    </div>
  )
}

export default Hero