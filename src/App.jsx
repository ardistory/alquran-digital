import { useEffect, useState } from "react";
import AppLayout from "./layouts/AppLayout.jsx";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card.js";
import { Button } from "./components/ui/button.js";
import { BookOpen, Loader, Play } from "lucide-react";
import { Input } from "./components/ui/input.js";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./components/ui/dialog.js";

function App() {
    const [qurans, setQurans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getQuranFromApi = async () => {
            const { data } = await axios.get(import.meta.env.VITE_API_URL);
            setQurans(data);
            (data.length > 0) ? setIsLoading(false) : setIsLoading(true);
        };

        getQuranFromApi();
    }, []);

    const filteredQuran = qurans.filter(quran => quran.nama.toLowerCase().includes(search.toLowerCase()));

    return (
        <AppLayout>
            <div className={'space-y-5'}>
                <Input placeholder={'Cari...'} onChange={(e) => setSearch(e.target.value)} />

                {(isLoading) ? (
                    <div>
                        <Loader className={'animate-spin'} />
                    </div>
                ) : filteredQuran.map((quran, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className={'w-full flex justify-between'}>
                                <p>
                                    {quran.nama}
                                </p>
                                <p>
                                    {quran.nama}
                                </p>
                            </CardTitle>
                            <CardDescription className={'w-full flex justify-between'}>
                                <p>
                                    {quran.nama}
                                </p>
                                <p>
                                    {quran.nama}
                                </p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            surat
                        </CardContent>
                        <CardFooter className={'flex gap-5'}>
                            <Dialog>
                                <DialogTrigger asChild={true}>
                                    <Button>
                                        <BookOpen />
                                        Informasi Surat
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className={'dark:text-white'}>
                                    <DialogTitle className={'dark:text-white'}>
                                        {quran.nama}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {quran.type}
                                    </DialogDescription>
                                    <p className={'dark:text-white'} dangerouslySetInnerHTML={{ __html: quran.keterangan }} />
                                </DialogContent>
                            </Dialog>
                            <Button>
                                <Play />
                                Audio
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}

export default App;
