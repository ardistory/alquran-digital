import { useEffect, useState } from "react";
import AppLayout from "./layouts/AppLayout.jsx";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card.js";
import { Button } from "./components/ui/button.js";
import { BookOpenCheck, BookText, Car, CheckCheck, ChevronLeft, ChevronRight, Loader, NotebookText, Volume2, X } from "lucide-react";
import { Input } from "./components/ui/input.js";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./components/ui/dialog.js";
import { Badge } from "./components/ui/badge.js";
import convertToArabIndia from "./lib/convertNumber.js";
import { cn } from "./lib/utils.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select.js";

function App() {
    const [allSurat, setAllSurat] = useState([]);
    const [qurans, setQurans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ayatChecked, setAyatChecked] = useState(() => {
        const storedAyatChecked = localStorage.getItem('ayatChecked');
        return storedAyatChecked ? JSON.parse(storedAyatChecked) : [];
    });

    const getQuranFromApi = async (nomor = 1) => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL_SURAT}/${nomor}`);
        setQurans(data.data);
        (Object.keys(data.data).length > 0) ? setIsLoading(false) : setIsLoading(true);
    };

    useEffect(() => {
        localStorage.setItem('ayatChecked', JSON.stringify(ayatChecked));
    }, [ayatChecked]);

    useEffect(() => {
        const getAllSurat = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL_SURAT}`);
            setAllSurat(data.data);
        };

        getAllSurat();
        getQuranFromApi();
    }, []);

    const switchSurat = async (nomor) => {
        getQuranFromApi(nomor);
    };

    const checkAyat = (namaSurat, nomorAyat) => {
        const existingSurat = ayatChecked.find(surat => surat.namaSurat === namaSurat);
        if (existingSurat) {
            const updatedAyatChecked = ayatChecked.map(surat => {
                if (surat.namaSurat === namaSurat) {
                    return { ...surat, ayat: [...surat.ayat, nomorAyat] };
                }
                return surat;
            });
            setAyatChecked(updatedAyatChecked);
        } else {
            setAyatChecked(prev => [...prev, { namaSurat, ayat: [nomorAyat] }]);
        }
    };

    const unCheckAyat = (namaSurat, nomorAyat) => {
        const existingSurat = ayatChecked.find(surat => surat.namaSurat === namaSurat);
        if (existingSurat) {
            const updatedAyatChecked = ayatChecked.map(surat => {
                if (surat.namaSurat === namaSurat) {
                    return { ...surat, ayat: surat.ayat.filter(ayat => ayat !== nomorAyat) };
                }
                return surat;
            }).filter(surat => surat.ayat.length > 0);
            setAyatChecked(updatedAyatChecked);
        }
    };

    const validasiCheckAyat = (namaSurat, nomorAyat) => {
        const ayatFind = ayatChecked.find(ayat => ayat.namaSurat === namaSurat);

        if (ayatFind?.ayat.includes(nomorAyat)) {
            return true;
        } else {
            return false;
        }
    };

    const clearData = () => {
    };

    return (
        <AppLayout>
            <div className={'space-y-5'}>
                <div className={'sticky top-28 z-10'}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className={'flex flex-col gap-5'}>
                                    <Select defaultValue={1} onValueChange={(value) => getQuranFromApi(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={'Cari Surat...'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allSurat.map((surat, index) => (
                                                <SelectItem key={index} value={surat.nomor}>
                                                    {surat.namaLatin} - {surat.jumlahAyat} Ayat
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className={'w-full flex items-center justify-between'}>
                                        {(qurans.suratSebelumnya) && (
                                            <Button onClick={() => switchSurat(qurans.suratSebelumnya.nomor)}>
                                                <ChevronLeft />
                                                {qurans.suratSebelumnya.namaLatin}
                                            </Button>
                                        )}
                                        {(qurans.suratSelanjutnya) && (
                                            <Button onClick={() => switchSurat(qurans.suratSelanjutnya.nomor)}>
                                                {qurans.suratSelanjutnya.namaLatin}
                                                <ChevronRight />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className={'w-full flex justify-between'}>
                            <Badge variant={'secondary'} className={'text-lg'}>
                                {qurans.namaLatin}
                            </Badge>
                            <Badge variant={'secondary'} className={'text-lg'}>
                                {qurans.arti}
                            </Badge>
                        </CardTitle>
                        <CardDescription className={'w-full flex justify-between'}>
                            <Badge variant={'secondary'}>
                                {qurans.tempatTurun}
                            </Badge>
                            <Badge variant={'secondary'}>
                                {qurans.jumlahAyat} Ayat
                            </Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={'space-y-5'}>
                            {(isLoading) ? (
                                <div className={'fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'}>
                                    <Loader className={'animate-spin'} size={55} />
                                </div>
                            ) : qurans?.ayat.map((quran, index) => (
                                <Card key={index} className={'space-y-5 relative'}>
                                    <CardHeader>
                                        <CardTitle className={'font-Amiri text-2xl text-end leading-[55px]'}>
                                            {(validasiCheckAyat(qurans.namaLatin, quran.nomorAyat)) ? (<div className={'before:w-10 before:h-10 before:bg-yellow-300/50 before:rounded-br-[200px] before:block before:rounded-tl-[55px] absolute left-0 top-0'} />) : null}{quran.teksArab}({convertToArabIndia(quran.nomorAyat)})
                                        </CardTitle>
                                        <CardDescription className={'text-xs'}>
                                            {quran.teksIndonesia}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className={'flex items-center justify-between md:gap-5 md:justify-start'}>
                                            <Button>
                                                <Volume2 />
                                                Audio
                                            </Button>
                                            <Button>
                                                <BookOpenCheck />
                                                Tafsir
                                            </Button>
                                            {(validasiCheckAyat(qurans.namaLatin, quran.nomorAyat)) ? (
                                                <Button size={'icon'} onClick={() => unCheckAyat(qurans.namaLatin, quran.nomorAyat)}>
                                                    <X />
                                                </Button>
                                            ) : (
                                                <Button size={'icon'} onClick={() => checkAyat(qurans.namaLatin, quran.nomorAyat)}>
                                                    <CheckCheck />
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {Object.keys(qurans).length > 0 && (
                <Card className={'container fixed bottom-5 left-[50%] translate-x-[-50%]'}>
                    <CardHeader>
                        <div className={'flex items-center justify-between'}>
                            <div>
                                <CardTitle>
                                    {qurans.namaLatin}
                                </CardTitle>
                                <CardDescription>
                                    {qurans.jumlahAyat} Ayat
                                </CardDescription>
                            </div>
                            <div className={'flex gap-5'}>
                                <Button>
                                    <Volume2 />
                                    Audio Full
                                </Button>
                                <Button>
                                    <NotebookText />
                                    Informasi Surat
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            )}
        </AppLayout >
    );
}

export default App;
