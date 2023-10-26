import {LandingNavbar} from "@/components/landing-navbar";
import {LandingHero}   from "@/components/landing-hero";
import { LandingComponent } from "@/components/landing-comp";

const LandingPage = () => {
    return (
       <div className="h-full">
            <LandingNavbar/>
            <LandingHero/>
            <LandingComponent />
       </div>
       
    );
}

export default LandingPage