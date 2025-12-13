import { use, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router';
import FileUploader from '~/component/FileUploader';
import Navbar from '~/component/Navbar'
import { usePuterStore } from '~/lib/puter';

const upload = () => {
    const {auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const[isProcessing, setIsProcessing] = useState(false);
    const[statusText, setStatusText] = useState('');
    const[file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
       setFile(file);
    }

    const handleAnalyze = async ({file, companyName, jobTitle, jobDescription}): {(companyName: string, jobTitle: string, jobDescription: string,file: File)} => {
        setIsProcessing(true);
        setStatusText('Uploading your resumefile...');

        const uploadFile=await fs.upload([file]);
        if(!uploadFile) return setStatusText('Error: Failed to Upload file');
         
        setStatusText('Converting to image...');
        //const imageConverting=await convertToImage(file);
    
;

    }

    const handleSubmit=(event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget.closest('form');
        if(!form) return;

        const formData = new FormData(form); 


        const companyName = formData.get('company-name')?.toString() || '';
        const jobTitle = formData.get('job-title')?.toString() || '';
        const jobDescription = formData.get('job-description')?.toString() || '';

       if(!file) return;

       handleAnalyze({file, companyName, jobTitle, jobDescription});

    }
     
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        
        <Navbar/>
    
        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Smart feedback for your dream jobs</h1> 
                {isProcessing ? (
                    <>

                       <h2>{statusText}</h2>
                       <img src="/images/resume-scan.gif" className="w-full"/>
                  </>
                   ) :( 
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                   )  }
                   {!isProcessing && (
                    <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                        <div className="form-div">
                            <label htmlFor="Company-name"> Company Name </label>
                            <input type="text" name="company-name" placeholder="Company Name" id="company-name"/>
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-title"> Job Title </label>
                            <input type="text" name="job-title" placeholder="Job Title" id="job-title"/>
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-description"> Job Description  </label>
                            <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description"/>
                        </div>
                        <div className="form-div">
                            <label htmlFor="uploader"> Uploade resume</label>
                            <FileUploader onFileSelect={handleFileSelect}/>
                        </div>
                        <button className="primary-button" type="submit">
                            Analyze Resume
                        </button>

                    </form>
                   ) 

                   }
            </div>

        
        </section>
    </main>
    )
}

export default upload