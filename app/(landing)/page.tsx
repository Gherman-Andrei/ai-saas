import {Button} from "@/components/ui/button";
import Link from "next/link";




const LandingPage = async () => {
    return (
        <div> Landing Page (Unprotected) 
            <div>
             <Link href="/Login">
            <Button variant="premium">
               Login
            </Button>
            </Link>
        </div>
        <div>
             <Link href="/Register">
            <Button variant = "premium">
               Register
            </Button>
            </Link>
        </div>
        </div>
       
    );
}

export default LandingPage