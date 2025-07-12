import { useEffect, useState } from "react";
import AppLayout from "./layouts/AppLayout.jsx";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card.js";
import { Button } from "./components/ui/button.js";
import { BookText, Info, Loader, Volume2, X } from "lucide-react";
import { Input } from "./components/ui/input.js";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./components/ui/dialog.js";
import { Badge } from "./components/ui/badge.js";

function App() {
    const [qurans, setQurans] = useState([]);
    const [ayats, setAyats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getQuranFromApi = async () => {
            const { data } = await axios.get(import.meta.env.VITE_API_URL_SURAT);
            setQurans(data);
            (data.length > 0) ? setIsLoading(false) : setIsLoading(true);
        };

        getQuranFromApi();
    }, []);

    const filteredQuran = qurans.filter(quran => quran.nama.toLowerCase().includes(search.toLowerCase()));

    const generateAyat = async (nomor) => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL_AYAT}/${nomor}`);
        (data.length > 0) ? setIsLoading(false) : setIsLoading(true);
        console.log(data);
    };

    return (
        <AppLayout>
            <div className={'space-y-5'}>
                <div className={'sticky top-28 bg-white dark:bg-black flex gap-5'}>
                    <Input value={search} placeholder={'Cari...'} onChange={(e) => setSearch(e.target.value)} />
                    {search.length > 0 && (
                        <Button variant={'secondary'} onClick={() => setSearch('')}>
                            <X />
                        </Button>
                    )}
                </div>

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
                                <p className={'font-Amiri'}>
                                    {quran.asma}
                                </p>
                            </CardTitle>
                            <CardDescription className={'w-full flex justify-between'}>
                                <Badge variant={'secondary'}>
                                    {quran.arti}
                                </Badge>
                                <Badge variant={'secondary'}>
                                    {quran.ayat} ayat
                                </Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => generateAyat(quran.nomor)}>
                                Baca Qur'an
                            </Button>
                        </CardContent>
                        <CardFooter className={'flex gap-5'}>
                            <Button>
                                <Volume2 />
                                Audio
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild={true}>
                                    <Button variant={"outline"}>
                                        <BookText />
                                        Informasi
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
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}

export default App;
