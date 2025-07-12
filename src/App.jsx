import { useEffect, useState } from "react";
import AppLayout from "./layouts/AppLayout.jsx";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card.js";
import { Button } from "./components/ui/button.js";
import { BookText, Info, Loader, Volume2, X } from "lucide-react";
import { Input } from "./components/ui/input.js";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./components/ui/dialog.js";
import { Badge } from "./components/ui/badge.js";
import convertToArabIndia from "./lib/convertNumber.js";
import { cn } from "./lib/utils.js";
import ReactAudioPlayer from "react-audio-player";

function App() {
    const [qurans, setQurans] = useState([]);
    const [ayats, setAyats] = useState([]);
    const [suratSelected, setSuratSelected] = useState({});
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

    const generateAyat = async (nomor, nama, ayat, audio) => {
        setSuratSelected(prev => ({ ...prev, nomor, nama, ayat, audio: `https://${audio.split('//')[1]}` }));

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL_AYAT}/${nomor}`);
        setAyats(data);
        (data.length > 0) ? setIsLoading(false) : setIsLoading(true);
    };

    const clearData = () => {
        setSearch('');
        setAyats([]);
    };

    return (
        <AppLayout>
            <div className={'space-y-5'}>
                <div className={'sticky top-28 bg-white dark:bg-black flex gap-5 rounded'}>
                    <Input value={search} placeholder={'Cari...'} onChange={(e) => setSearch(e.target.value)} />
                    {search.length > 0 && (
                        <Button variant={'outline'} onClick={() => clearData()}>
                            <X />
                        </Button>
                    )}
                </div>

                {(isLoading) ? (
                    <div className={'fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'}>
                        <Loader className={'animate-spin'} size={55} />
                    </div>
                ) : filteredQuran.map((quran, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className={'w-full flex justify-between'}>
                                <Badge variant={'secondary'} className={'text-lg'}>
                                    {quran.nama}
                                </Badge>
                                <Badge className={'font-Amiri text-2xl'} variant={'secondary'}>
                                    {quran.asma}
                                </Badge>
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
                            {quran.nomor === suratSelected.nomor && (
                                <div className={'space-y-5'}>
                                    {ayats.map((ayat, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle className={'font-Amiri text-2xl text-end leading-[55px]'}>
                                                    {ayat.ar}({convertToArabIndia(ayat.nomor)})
                                                </CardTitle>
                                                <CardDescription className={'text-xs'}>
                                                    {ayat.id}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className={'flex justify-between md:justify-normal md:gap-5'}>
                            <Button onClick={() => generateAyat(quran.nomor, quran.nama, quran.ayat, quran.audio)} variant={'secondary'}>
                                <BookText />
                                Lihat Ayat
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild={true}>
                                    <Button variant={'secondary'}>
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

            <Card className={cn('bg-white dark:bg-black dark:text-white w-full h-44 bottom-[-180px] fixed left-0 shadow-2xl shadow-black transition-all duration-200', { 'bottom-0': ayats.length > 0 })}>
                <CardHeader>
                    <div className={'flex flex-col gap-5'}>
                        <div className={'flex items-center justify-between border-b-2 pb-5'}>
                            <div>
                                <CardTitle>
                                    {suratSelected.nama}
                                </CardTitle>
                                <CardDescription>
                                    {suratSelected.ayat} Ayat
                                </CardDescription>
                            </div>
                            <div className={'flex gap-5'}>
                                <Button variant={'secondary'}>
                                    <Volume2 />
                                    Audio
                                </Button>
                                <Button size={'icon'} variant={'secondary'} onClick={() => clearData()}>
                                    <X />
                                </Button>
                            </div>
                        </div>
                        <div className={'flex justify-center'}>
                            <ReactAudioPlayer
                                src={suratSelected.audio}
                                controls
                            />
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </AppLayout >
    );
}

export default App;
