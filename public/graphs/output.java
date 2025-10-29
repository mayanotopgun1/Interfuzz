import java.util.Set;
import java.util.HashMap;
import java.util.Optional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Map;
import java.lang.annotation.RetentionPolicy;
import java.io.File;
import java.lang.annotation.Retention;
import java.util.HashSet;
public class Test9257 implements Ir_25_05_09_07_32_28_056 {
    public static final int N = 256;

    public static long instanceCount = -35793L;

    public byte byFld = -50;

    public double dFld = 124.7373;

    public int iFld = -14;

    public int iFld1 = 8;

    public static long[] lArrFld = new long[Test9257.N];

    public int[] iArrFld = new int[Test9257.N];

    static {
        FuzzerUtils.init(Test9257.lArrFld, 176L);
    }

    public static long vMeth_check_sum = 0;

    public static long vSmallMeth_check_sum = 0;

    public static long iMeth_check_sum = 0;

    public static long iMeth1_check_sum = 0;

    public static void vMeth(float f) {
        try {
            Ce_25_05_09_07_32_51_184 ce_25_05_09_07_32_51_184_25_05_09_07_35_53_22713c503 = Ce_25_05_09_07_32_51_184.VALUE2;
            ce_25_05_09_07_32_51_184_25_05_09_07_35_53_22713c503.method_25_05_09_07_33_21_461cb3dff();
        } catch (java.lang.Exception e25_05_09_07_35_53_2270c5546) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_33_21_461cb3dff");
        }
        try {
            Cg_25_05_09_07_32_27_074<java.lang.String[]> cg_25_05_09_07_32_27_074_25_05_09_07_32_27_253154c78 = new Cg_25_05_09_07_32_27_074<java.lang.String[]>();
            java.lang.String string_25_05_09_07_32_27_320d7f3ff = "123456abc";
            java.lang.String[] string_arr__25_05_09_07_32_27_272d2da3b = new java.lang.String[]{ string_25_05_09_07_32_27_320d7f3ff };
            cg_25_05_09_07_32_27_074_25_05_09_07_32_27_253154c78.addItem25_05_09_07_32_27_074(string_arr__25_05_09_07_32_27_272d2da3b);
        } catch (java.lang.Exception e25_05_09_07_32_27_32663a602) {
            java.lang.System.out.println("Method Invoke Exception: addItem25_05_09_07_32_27_074");
        }
        try {
            Cg_25_05_09_07_32_27_074<java.lang.Byte[]> cg_25_05_09_07_32_27_074_25_05_09_07_35_02_116e66d40 = new Cg_25_05_09_07_32_27_074<java.lang.Byte[]>();
            java.lang.Byte byte_25_05_09_07_35_02_11800b1f3 = ((byte) (28));
            java.lang.Byte[] byte_arr__25_05_09_07_35_02_11696a62c = new java.lang.Byte[]{ byte_25_05_09_07_35_02_11800b1f3 };
            cg_25_05_09_07_32_27_074_25_05_09_07_35_02_116e66d40.addItem25_05_09_07_32_27_074(byte_arr__25_05_09_07_35_02_11696a62c);
        } catch (java.lang.Exception e25_05_09_07_35_02_1195de507) {
            java.lang.System.out.println("Method Invoke Exception: addItem25_05_09_07_32_27_074");
        }
        try {
            float float_25_05_09_07_33_21_826fb374b = f;
            Test9257.iMeth(float_25_05_09_07_33_21_826fb374b);
        } catch (java.lang.Exception e25_05_09_07_33_21_826186b17) {
            java.lang.System.out.println("Method Invoke Exception: iMeth");
        }
        Test9257.instanceCount *= -40260;
        try {
            Ce_25_05_09_07_32_51_184 ce_25_05_09_07_32_51_184_25_05_09_07_37_24_541f6a215 = Ce_25_05_09_07_32_51_184.VALUE2;
            java.util.ArrayList<java.lang.Integer> arrayList_25_05_09_07_37_24_5413409c6 = new java.util.ArrayList<java.lang.Integer>();
            int int_25_05_09_07_37_24_5427ba82e = 35;
            java.lang.Integer integer_25_05_09_07_37_24_543f993bf = 90;
            ce_25_05_09_07_32_51_184_25_05_09_07_37_24_541f6a215.method_25_05_09_07_35_00_470e3d17b(arrayList_25_05_09_07_37_24_5413409c6, int_25_05_09_07_37_24_5427ba82e, integer_25_05_09_07_37_24_543f993bf);
        } catch (java.lang.Exception e25_05_09_07_37_24_54364da38) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_35_00_470e3d17b");
        }
        try {
            Ce_25_05_09_07_33_20_256 ce_25_05_09_07_33_20_256_25_05_09_07_33_54_1912332a6 = Ce_25_05_09_07_33_20_256.VALUE2;
            ce_25_05_09_07_33_20_256_25_05_09_07_33_54_1912332a6.printLocationMethod_25_05_09_07_33_20_257a3ea0d();
        } catch (java.lang.Exception e25_05_09_07_33_54_1914fe790) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_33_20_257a3ea0d");
        }
        Test9257.vMeth_check_sum += java.lang.Float.floatToIntBits(f);
    }

    public static int iMeth1(int i5, boolean b, int i6) {
        int i7 = -2;
        int i8 = -9;
        int i9 = -1539;
        try {
            Cg_25_05_09_07_32_27_074<java.lang.Integer> cg_25_05_09_07_32_27_074_25_05_09_07_32_28_223875e05 = new Cg_25_05_09_07_32_27_074<java.lang.Integer>();
            cg_25_05_09_07_32_27_074_25_05_09_07_32_28_223875e05.printLocationMethod_25_05_09_07_32_27_079d4a418();
        } catch (java.lang.Exception e25_05_09_07_32_28_22441d244) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_32_27_079d4a418");
        }
        int i10 = -10672;
        int i11 = 8;
        int i12 = 40644;
        try {
            Cg_25_05_09_07_32_50_335<java.lang.Short> cg_25_05_09_07_32_50_335_25_05_09_07_34_59_9217ec994 = new Cg_25_05_09_07_32_50_335<java.lang.Short>();
            cg_25_05_09_07_32_50_335_25_05_09_07_34_59_9217ec994.printLocationMethod_25_05_09_07_32_50_3355174af();
        } catch (java.lang.Exception e25_05_09_07_34_59_92121d490) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_32_50_3355174af");
        }
        try {
            boolean boolean_25_05_09_07_33_53_73740aaef = b;
            boolean boolean_25_05_09_07_33_53_73893c2dc = b;
            c437.testFunction(boolean_25_05_09_07_33_53_73740aaef, boolean_25_05_09_07_33_53_73893c2dc);
        } catch (java.lang.Exception e25_05_09_07_33_53_7389e9a07) {
            java.lang.System.out.println("Method Invoke Exception: testFunction");
        }
        int i13 = 1;
        int[] iArr = new int[Test9257.N];
        double d = -1.24374;
        try {
            Cg_25_05_09_07_32_27_074<java.lang.Integer[]> cg_25_05_09_07_32_27_074_25_05_09_07_32_49_717ecbe50 = new Cg_25_05_09_07_32_27_074<java.lang.Integer[]>();
            cg_25_05_09_07_32_27_074_25_05_09_07_32_49_717ecbe50.printLocationMethod_25_05_09_07_32_27_079d4a418();
        } catch (java.lang.Exception e25_05_09_07_32_49_717ab9764) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_32_27_079d4a418");
        }
        float f3 = -2.817F;
        short s1 = -24080;
        byte by = 125;
        FuzzerUtils.init(iArr, 3);
        i5 *= -5;
        switch (((i5 >>> 1) % 1) + 117) {
            case 117 :
                for (i7 = 2; i7 < 5; ++i7) {
                    i8 = ((int) (d));
                    for (i9 = 1; i9 < 4; i9++) {
                        Test9257.instanceCount += i9;
                        i8 -= ((int) (Test9257.instanceCount));
                        i10 = ((int) (Test9257.instanceCount));
                    }
                    i11 = 1;
                    do {
                        try {
                            iArr[i7 - 1] = i7 % i11;
                            iArr[(i12 >>> 1) % Test9257.N] = i8 % 246;
                            iArr[i11] = i8 % i10;
                        } catch (java.lang.ArithmeticException a_e) {
                        }
                        i12 += i11;
                        iArr[i7] *= ((int) (Test9257.instanceCount));
                        i13 = 1;
                        while ((++i13) < 1) {
                            i12 += (-134) + (i13 * i13);
                            f3 = s1;
                            d += 1594;
                            switch ((((i9 >>> 1) % 2) * 5) + 99) {
                                case 103 :
                                    b = b;
                                    Test9257.instanceCount += i13;
                                    if (b)
                                        continue;

                                    i6 -= i11;
                                    if (b)
                                        continue;

                                    d -= i13;
                                    by = ((byte) (i8));
                                    b = b;
                                    i10 += i13 * i13;
                                    if (b)
                                        continue;

                                    Test9257.instanceCount *= ((long) (2.916F));
                                    d = Test9257.instanceCount;
                                    i10 -= ((int) (Test9257.instanceCount));
                                    by += ((byte) (8250611372664101936L + (i13 * i13)));
                                    break;
                                case 102 :
                                    f3 += f3;
                                    i6 = i7;
                                    switch ((i7 % 8) + 15) {
                                        case 15 :
                                            i12 = ((int) (Test9257.instanceCount));
                                            i12 += i13 * i13;
                                            iArr[i13 + 1] -= i5;
                                            break;
                                        case 16 :
                                            i10 += -27911;
                                            break;
                                        case 17 :
                                            i5 += i13;
                                        case 18 :
                                            i6 *= ((int) (3353593966L));
                                            break;
                                        case 19 :
                                            i10 >>= ((int) (Test9257.instanceCount));
                                            break;
                                        case 20 :
                                            i8 = i12;
                                            break;
                                        case 21 :
                                            i5 *= i13;
                                            break;
                                        case 22 :
                                            iArr[i11 - 1] = by;
                                            break;
                                        default :
                                            Test9257.instanceCount <<= i12;
                                    }
                                default :
                                    i6 = ((int) (Test9257.instanceCount));
                            }
                        } 
                    } while ((++i11) < 4 );
                }
                break;
        }
        long meth_res = (((((((((((((i5 + (b ? 1 : 0)) + i6) + i7) + i8) + java.lang.Double.doubleToLongBits(d)) + i9) + i10) + i11) + i12) + i13) + java.lang.Float.floatToIntBits(f3)) + s1) + by) + FuzzerUtils.checkSum(iArr);
        Test9257.iMeth1_check_sum += meth_res;
        return ((int) (meth_res));
    }

    public static int iMeth(float f2) {
        int i4 = 12243;
        short s = -17953;
        byte by1 = 61;
        i4 += ((int) (f2 + (s ^= ((short) (Test9257.instanceCount * Test9257.instanceCount)))));
        i4 = Test9257.iMeth1(i4, false, i4);
        try {
            Cg_25_05_09_07_32_27_074<java.lang.Short[]> cg_25_05_09_07_32_27_074_25_05_09_07_32_50_2438b44b8 = new Cg_25_05_09_07_32_27_074<java.lang.Short[]>();
            java.lang.Short short_25_05_09_07_32_50_2483840ad = ((short) (8957));
            java.lang.Short[] short_arr__25_05_09_07_32_50_2452a8997 = new java.lang.Short[]{ short_25_05_09_07_32_50_2483840ad };
            cg_25_05_09_07_32_27_074_25_05_09_07_32_50_2438b44b8.addItem25_05_09_07_32_27_074(short_arr__25_05_09_07_32_50_2452a8997);
        } catch (java.lang.Exception e25_05_09_07_32_50_248c82959) {
            java.lang.System.out.println("Method Invoke Exception: addItem25_05_09_07_32_27_074");
        }
        try {
            Cg_25_05_09_07_32_27_074<java.lang.String> cg_25_05_09_07_32_27_074_25_05_09_07_33_22_1615b3e2a = new Cg_25_05_09_07_32_27_074<java.lang.String>();
            java.lang.String string_25_05_09_07_33_22_17145318b = "123456abc";
            java.lang.String[] string_arr__25_05_09_07_33_22_1626116af = new java.lang.String[]{ string_25_05_09_07_33_22_17145318b };
            cg_25_05_09_07_32_27_074_25_05_09_07_33_22_1615b3e2a.mainTest(string_arr__25_05_09_07_33_22_1626116af);
        } catch (java.lang.Exception e25_05_09_07_33_22_172b3f9f7) {
            java.lang.System.out.println("Method Invoke Exception: mainTest");
        }
        Test9257.instanceCount >>>= by1;
        long meth_res = ((java.lang.Float.floatToIntBits(f2) + i4) + s) + by1;
        Test9257.iMeth_check_sum += meth_res;
        return ((int) (meth_res));
    }

    public static void vSmallMeth(int i2, int i3) {
        float f4 = -74.93F;
        Test9257.vMeth(i3 - (i2 <<= 5 - Test9257.iMeth(f4)));
        try {
            Cr_25_05_09_07_33_52_350 cr_25_05_09_07_33_52_350_25_05_09_07_36_27_6152ab89d = new Cr_25_05_09_07_33_52_350();
            cr_25_05_09_07_33_52_350_25_05_09_07_36_27_6152ab89d.printLocationMethod_25_05_09_07_33_52_351d45a08();
        } catch (java.lang.Exception e25_05_09_07_36_27_62398c591) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_33_52_351d45a08");
        }
        i3 += ((int) (f4));
        try {
            java.lang.String string_25_05_09_07_37_22_640726f01 = "123456abc";
            c543.GreetingClass greetingClass_25_05_09_07_37_22_59622aed2 = new c543.GreetingClass(string_25_05_09_07_37_22_640726f01);
            greetingClass_25_05_09_07_37_22_59622aed2.provideGreeting();
        } catch (java.lang.Exception e25_05_09_07_37_22_640b21183) {
            java.lang.System.out.println("Method Invoke Exception: provideGreeting");
        }
        try {
            Cg_25_05_09_07_32_27_074<java.lang.Integer> cg_25_05_09_07_32_27_074_25_05_09_07_32_29_206bbac5d = new Cg_25_05_09_07_32_27_074<java.lang.Integer>();
            java.lang.Integer integer_25_05_09_07_32_29_22120b58f = 20;
            cg_25_05_09_07_32_27_074_25_05_09_07_32_29_206bbac5d.addItem25_05_09_07_32_27_074(integer_25_05_09_07_32_29_22120b58f);
        } catch (java.lang.Exception e25_05_09_07_32_29_2223298f6) {
            java.lang.System.out.println("Method Invoke Exception: addItem25_05_09_07_32_27_074");
        }
        try {
            float float_25_05_09_07_32_51_11234f2b6 = f4;
            Test9257.iMeth(float_25_05_09_07_32_51_11234f2b6);
        } catch (java.lang.Exception e25_05_09_07_32_51_1130a966f) {
            java.lang.System.out.println("Method Invoke Exception: iMeth");
        }
        try {
            Cg_25_05_09_07_32_27_074<java.lang.Integer[]> cg_25_05_09_07_32_27_074_25_05_09_07_35_01_2068c84ef = new Cg_25_05_09_07_32_27_074<java.lang.Integer[]>();
            java.lang.String string_25_05_09_07_35_01_21388cd3e = "123456abc";
            java.lang.String[] string_arr__25_05_09_07_35_01_2066669a5 = new java.lang.String[]{ string_25_05_09_07_35_01_21388cd3e };
            cg_25_05_09_07_32_27_074_25_05_09_07_35_01_2068c84ef.mainTest(string_arr__25_05_09_07_35_01_2066669a5);
        } catch (java.lang.Exception e25_05_09_07_35_01_214d7a853) {
            java.lang.System.out.println("Method Invoke Exception: mainTest");
        }
        Test9257.vSmallMeth_check_sum += (i2 + i3) + java.lang.Float.floatToIntBits(f4);
    }

    public void mainTest(java.lang.String[] strArr1) {
        float f1 = 119.646F;
        float[] fArr = new float[Test9257.N];
        int i = 14;
        int i1 = -1;
        int i14 = 51031;
        int i15 = 92;
        int i16 = 30174;
        int i17 = 57976;
        int i18 = -174;
        int i19 = -237;
        try {
            Cg_25_05_09_07_32_27_074<java.lang.String> cg_25_05_09_07_32_27_074_25_05_09_07_32_50_559ed7205 = new Cg_25_05_09_07_32_27_074<java.lang.String>();
            cg_25_05_09_07_32_27_074_25_05_09_07_32_50_559ed7205.printLocationMethod_25_05_09_07_32_27_079d4a418();
        } catch (java.lang.Exception e25_05_09_07_32_50_560a5315f) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_32_27_079d4a418");
        }
        double d1 = -2.8154;
        double d2 = -21.70152;
        boolean b1 = true;
        try {
            Cr_25_05_09_07_33_52_350 cr_25_05_09_07_33_52_350_25_05_09_07_34_25_4233fdc61 = new Cr_25_05_09_07_33_52_350();
            cr_25_05_09_07_33_52_350_25_05_09_07_34_25_4233fdc61.printLocationMethod_25_05_09_07_33_52_351d45a08();
        } catch (java.lang.Exception e25_05_09_07_34_25_43530a4da) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_33_52_351d45a08");
        }
        short s2 = 10210;
        byte[][] byArr = new byte[Test9257.N][Test9257.N];
        FuzzerUtils.init(fArr, 0.97F);
        FuzzerUtils.init(byArr, ((byte) (-9)));
        Test9257.vMeth(f1);
        for (i = 12; i < 15; ++i) {
            i1 = ((int) ((i * Test9257.instanceCount) * (i1++)));
            f1 += (-9) + (i * i);
        }
        Test9257.lArrFld[((-46) >>> 1) % Test9257.N] += i1++;
        for (int smallinvoc = 0; smallinvoc < 104; smallinvoc++)
            Test9257.vSmallMeth(i, -48803);

        i14 = 1;
        do {
            i1 -= i;
            Test9257.lArrFld[i14] *= i;
            for (d1 = 1; d1 < 4; ++d1) {
                iArrFld[i14 - 1] ^= -41;
                i1 += i15;
                f1 += ((float) (((d1 * i15) + byFld) - i1));
                dFld -= i15;
                Test9257.lArrFld[((int) (d1 + 1))] <<= -9;
                iArrFld[((int) (d1 - 1))] += i1;
                i15 += ((int) (((d1 * i15) + i14) - f1));
                i1 += ((int) (((d1 * i14) + i) - i1));
                Test9257.lArrFld[((int) (d1 + 1))] = Test9257.instanceCount;
                i1 = i14;
                if (false)
                    continue;

                if (b1)
                    continue;

                i15 += ((int) (dFld));
                i1 += ((int) (Test9257.instanceCount));
            }
            d2 = 55;
            while ((--d2) > 0) {
                f1 /= ((float) (122.52998));
                for (i16 = 1; i16 > (-2); --i16) {
                    Test9257.lArrFld[((int) (d2 - 1))] += ((long) (-2.81F));
                    i1 -= 17483;
                    switch ((i16 % 2) + 108) {
                        case 108 :
                            i1 -= byFld;
                            i15 += ((int) (Test9257.instanceCount));
                            f1 += 2;
                            Test9257.instanceCount += ((long) (d1));
                            if (b1)
                                break;

                            b1 = b1;
                            i1 += ((int) (-4137195794L));
                            i17 += i16;
                            break;
                        case 109 :
                            iArrFld[((int) (d2))] += ((int) (d2));
                            Test9257.instanceCount += Test9257.instanceCount;
                            s2 = ((short) (i17));
                            Test9257.instanceCount += i16;
                            Test9257.instanceCount = i15;
                            i17 += i16;
                            i17 -= ((int) (d1));
                            i17 = i14;
                            Test9257.instanceCount >>= i17;
                            break;
                        default :
                            byFld ^= ((byte) (i17));
                            i1 += i16;
                            Test9257.lArrFld[((int) (d2))] += i;
                            i1 >>= i1;
                            try {
                                i15 = (-43386) % i1;
                                iArrFld[i16] = i1 / 12;
                                i17 = (-34555) / i;
                            } catch (java.lang.ArithmeticException a_e) {
                            }
                            Test9257.instanceCount = i15;
                            Test9257.instanceCount += (-6221411612675516858L) + (i16 * i16);
                            i17 += ((int) (d1));
                    }
                    i1 = 29617;
                    Test9257.instanceCount -= ((long) (-1.495F));
                    i15 += i16 ^ i14;
                    iArrFld[i16 - 1] += ((int) (-42120L));
                    i1 *= i1;
                }
                Test9257.instanceCount = Test9257.instanceCount;
                i17 <<= i14;
                i15 += ((int) (d2));
                dFld *= i16;
                byArr[i14 + 1][i14 - 1] = ((byte) (Test9257.instanceCount));
                iArrFld[((int) (d2 - 1))] *= i14;
                Test9257.instanceCount *= i15;
                for (i18 = 1; i18 < 4; ++i18) {
                    Test9257.instanceCount <<= i16;
                    iArrFld = FuzzerUtils.int1array(Test9257.N, ((int) (-14)));
                    try {
                        iFld = (-57386) % i18;
                        i1 = (-232) / i1;
                        iFld = iArrFld[i18] / (-402763552);
                    } catch (java.lang.ArithmeticException a_e) {
                    }
                    iFld *= i14;
                    i17 += i18;
                    i15 = iFld1;
                    iFld <<= ((int) (Test9257.instanceCount));
                }
            } 
        } while ((++i14) < 92 );
        FuzzerUtils.out.println((((("f1 i i1 = " + java.lang.Float.floatToIntBits(f1)) + ",") + i) + ",") + i1);
        FuzzerUtils.out.println((((("i14 d1 i15 = " + i14) + ",") + java.lang.Double.doubleToLongBits(d1)) + ",") + i15);
        FuzzerUtils.out.println((((("b1 d2 i16 = " + (b1 ? 1 : 0)) + ",") + java.lang.Double.doubleToLongBits(d2)) + ",") + i16);
        FuzzerUtils.out.println((((("i17 s2 i18 = " + i17) + ",") + s2) + ",") + i18);
        FuzzerUtils.out.println((((("i19 fArr byArr = " + i19) + ",") + java.lang.Double.doubleToLongBits(FuzzerUtils.checkSum(fArr))) + ",") + FuzzerUtils.checkSum(byArr));
        FuzzerUtils.out.println((((("Test9257.instanceCount byFld dFld = " + Test9257.instanceCount) + ",") + byFld) + ",") + java.lang.Double.doubleToLongBits(dFld));
        FuzzerUtils.out.println((((("iFld iFld1 Test9257.lArrFld = " + iFld) + ",") + iFld1) + ",") + FuzzerUtils.checkSum(Test9257.lArrFld));
        FuzzerUtils.out.println("iArrFld = " + FuzzerUtils.checkSum(iArrFld));
        FuzzerUtils.out.println("vMeth_check_sum: " + Test9257.vMeth_check_sum);
        FuzzerUtils.out.println("iMeth1_check_sum: " + Test9257.iMeth1_check_sum);
        FuzzerUtils.out.println("iMeth_check_sum: " + Test9257.iMeth_check_sum);
        try {
            float float_25_05_09_07_32_29_08331553d = f1;
            Test9257.vMeth(float_25_05_09_07_32_29_08331553d);
        } catch (java.lang.Exception e25_05_09_07_32_29_084e7dfdb) {
            java.lang.System.out.println("Method Invoke Exception: vMeth");
        }
        FuzzerUtils.out.println("vSmallMeth_check_sum: " + Test9257.vSmallMeth_check_sum);
    }

    public static void main(java.lang.String[] strArr) {
        try {
            Test9257 _instance = new Test9257();
            for (int i = 0; i < 1; i++) {
                _instance.mainTest(strArr);
            }
        } catch (java.lang.Exception ex) {
            FuzzerUtils.out.println(ex.getClass().getCanonicalName());
        }
    }

    class Ci_25_05_09_07_32_49_806 extends Test9257 implements Ir_25_05_09_07_32_49_257 {
        public boolean method_25_05_09_07_33_21_005ae589a(java.lang.CharSequence a, java.lang.CharSequence b) throws java.lang.Exception {
            if (a == b) {
                return true;
            }
            int length = 92;
            if (((a != null) && (b != null)) && ((length = a.length()) == b.length())) {
                if ((a instanceof java.lang.String) && (b instanceof java.lang.String)) {
                    return a.equals(b);
                } else {
                    for (int i = 0; i < length; i++) {
                        if (a.charAt(i) != b.charAt(i)) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            return false;
        }

        public boolean method_25_05_09_07_33_20_0922e9030(int statusCode) throws java.lang.Exception {
            try {
                Test9257 test9257_25_05_09_07_34_25_90415ef94 = new Test9257();
                Test9257.Ci_25_05_09_07_33_21_562 ci_25_05_09_07_33_21_562_25_05_09_07_34_25_903b4145e = test9257_25_05_09_07_34_25_90415ef94.new Ci_25_05_09_07_33_21_562();
                ci_25_05_09_07_33_21_562_25_05_09_07_34_25_903b4145e.printLocationMethod_25_05_09_07_33_21_5629b59bb();
            } catch (java.lang.Exception e25_05_09_07_34_25_918162bd7) {
                java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_33_21_5629b59bb");
            }
            switch (statusCode) {
                case 502 :
                case 503 :
                case 504 :
                    return true;
            }
            return false;
        }

        void printLocationMethod_25_05_09_07_32_49_81089a43b() {
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_32_49_806 printLocationMethod_25_05_09_07_32_49_81089a43b");
        }

        @java.lang.Override
        public void mainTest(java.lang.String[] strArr1) {
            try {
                Test9257 test9257_25_05_09_07_33_20_110313f27 = new Test9257.Ci_25_05_09_07_32_49_806();
                Test9257.Ci_25_05_09_07_32_49_806 ci_25_05_09_07_32_49_806_25_05_09_07_33_20_10864d6e3 = test9257_25_05_09_07_33_20_110313f27.new Ci_25_05_09_07_32_49_806();
                int int_25_05_09_07_33_20_12608d33a = 98;
                ci_25_05_09_07_32_49_806_25_05_09_07_33_20_10864d6e3.method_25_05_09_07_33_20_0922e9030(int_25_05_09_07_33_20_12608d33a);
            } catch (java.lang.Exception e25_05_09_07_33_20_1262da353) {
                java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_33_20_0922e9030");
            }
            int a = 123;
        }
    }

    class Ci_25_05_09_07_33_21_562 implements If_25_05_09_07_33_21_202 {
        public int method_25_05_09_07_36_55_421007856(int width, int height) throws java.lang.Exception {
            java.lang.String value = null;
            return width + height;
        }

        public int method_25_05_09_07_36_55_372ce5712() throws java.lang.Exception {
            int _la = 18;
            try {
                if (!((_la == 57) || (_la == 150))) {
                } else {
                }
            } catch (java.lang.Exception re) {
            } finally {
            }
            return _la;
        }

        void printLocationMethod_25_05_09_07_33_21_5629b59bb() {
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_33_21_562 printLocationMethod_25_05_09_07_33_21_5629b59bb");
        }

        public int apply_25_05_09_07_32_49_340() {
            try {
                Test9257 test9257_25_05_09_07_36_55_429e1b1bd = new Test9257();
                Test9257.Ci_25_05_09_07_33_21_562 ci_25_05_09_07_33_21_562_25_05_09_07_36_55_428204b44 = test9257_25_05_09_07_36_55_429e1b1bd.new Ci_25_05_09_07_33_21_562();
                int int_25_05_09_07_36_55_430195055 = 98;
                int int_25_05_09_07_36_55_430764372 = 51;
                ci_25_05_09_07_33_21_562_25_05_09_07_36_55_428204b44.method_25_05_09_07_36_55_421007856(int_25_05_09_07_36_55_430195055, int_25_05_09_07_36_55_430764372);
            } catch (java.lang.Exception e25_05_09_07_36_55_430d01416) {
                java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_36_55_421007856");
            }
            return 123123;
        }

        public int apply_25_05_09_07_33_21_202() {
            try {
                Test9257 test9257_25_05_09_07_36_55_380acaa2c = new Test9257();
                Test9257.Ci_25_05_09_07_33_21_562 ci_25_05_09_07_33_21_562_25_05_09_07_36_55_3793199f1 = test9257_25_05_09_07_36_55_380acaa2c.new Ci_25_05_09_07_33_21_562();
                ci_25_05_09_07_33_21_562_25_05_09_07_36_55_3793199f1.method_25_05_09_07_36_55_372ce5712();
            } catch (java.lang.Exception e25_05_09_07_36_55_42121b9d5) {
                java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_36_55_372ce5712");
            }
            return 123123;
        }
    }

    class Ci_25_05_09_07_33_21_667 extends Test9257 {
        public int method_25_05_09_07_33_51_815483be5(java.sql.Connection conn, java.lang.String state) throws java.lang.Exception {
            java.io.ByteArrayOutputStream baos = null;
            java.sql.PreparedStatement ps = null;
            int insertResult = 0;
            try {
                long nextFireTime = -1;
                ps.setBigDecimal(4, new java.math.BigDecimal(java.lang.String.valueOf(nextFireTime)));
                long prevFireTime = -1;
                ps.setBigDecimal(5, new java.math.BigDecimal(java.lang.String.valueOf(prevFireTime)));
                ps.setString(6, state);
                java.lang.String type = "BLOB";
                ps.setString(7, type);
                long endTime = 0;
                ps.setBigDecimal(9, new java.math.BigDecimal(java.lang.String.valueOf(endTime)));
                insertResult = ps.executeUpdate();
            } finally {
            }
            return insertResult;
        }

        void printLocationMethod_25_05_09_07_33_21_6670524ae() {
            try {
                Cr_25_05_09_07_34_27_663 cr_25_05_09_07_34_27_663_25_05_09_07_35_58_197e5f291 = new Cr_25_05_09_07_34_27_663();
                cr_25_05_09_07_34_27_663_25_05_09_07_35_58_197e5f291.printLocationMethod_25_05_09_07_34_27_663ed4557();
            } catch (java.lang.Exception e25_05_09_07_35_58_21689e1ed) {
                java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_34_27_663ed4557");
            }
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_33_21_667 printLocationMethod_25_05_09_07_33_21_6670524ae");
        }

        @java.lang.Override
        public void mainTest(java.lang.String[] strArr1) {
            try {
                Test9257 test9257_25_05_09_07_33_51_843c791a4 = new Test9257.Ci_25_05_09_07_32_49_806();
                Test9257.Ci_25_05_09_07_33_21_667 ci_25_05_09_07_33_21_667_25_05_09_07_33_51_84131247f = test9257_25_05_09_07_33_51_843c791a4.new Ci_25_05_09_07_33_21_667();
                java.sql.Connection connection_25_05_09_07_33_51_870dbfeb1 = null;
                java.lang.String string_25_05_09_07_33_51_8795b4cf1 = "123456abc";
                ci_25_05_09_07_33_21_667_25_05_09_07_33_51_84131247f.method_25_05_09_07_33_51_815483be5(connection_25_05_09_07_33_51_870dbfeb1, string_25_05_09_07_33_51_8795b4cf1);
            } catch (java.lang.Exception e25_05_09_07_33_51_880e715a9) {
                java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_33_51_815483be5");
            }
            int a = 123;
        }
    }

    class Ci_25_05_09_07_33_52_127 extends Cr_25_05_09_07_33_52_350 implements Ir_25_05_09_07_36_57_232 {
        public int method_25_05_09_07_35_55_489bd64e4(int c1) {
            c1 &= 0xf;
            java.lang.String result = switch (c1) {
                case 0x0 ->
                    "Zero";
                case 0x1 ->
                    "One";
                case 0x2 ->
                    "Two";
                case 0x3 ->
                    "Three";
                case 0x4 ->
                    "Four";
                case 0x5 ->
                    "Five";
                case 0x6 ->
                    "Six";
                case 0x7 ->
                    "Seven";
                case 0x8 ->
                    "Eight";
                case 0x9 ->
                    "Nine";
                case 0xa ->
                    "Ten";
                case 0xb ->
                    "Eleven";
                case 0xc ->
                    "Twelve";
                default ->
                    c1 >= 0xd ? "Greater" : "Other";
            };
            int length = ((int) (result.chars().filter((int ch) -> (ch >= 'A') && (ch <= 'Z')).count())) + result.length();
            return length + (c1 >= 0xd ? 1 : 0);
        }

        void printLocationMethod_25_05_09_07_33_52_127570dd3() {
            try {
                c437.A a_25_05_09_07_35_53_818950aa7 = new c437.A();
                a_25_05_09_07_35_53_818950aa7.m();
            } catch (java.lang.Exception e25_05_09_07_35_53_823c20e31) {
                java.lang.System.out.println("Method Invoke Exception: m");
            }
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_33_52_127 printLocationMethod_25_05_09_07_33_52_127570dd3");
        }

        @java.lang.Override
        public void printLocationMethod_25_05_09_07_33_52_351d45a08() {
            try {
                Test9257 test9257_25_05_09_07_35_55_517bee1eb = new Test9257();
                Test9257.Ci_25_05_09_07_33_52_127 ci_25_05_09_07_33_52_127_25_05_09_07_35_55_5159bf302 = test9257_25_05_09_07_35_55_517bee1eb.new Ci_25_05_09_07_33_52_127();
                int int_25_05_09_07_35_55_549e14420 = 86;
                ci_25_05_09_07_33_52_127_25_05_09_07_35_55_5159bf302.method_25_05_09_07_35_55_489bd64e4(int_25_05_09_07_35_55_549e14420);
            } catch (java.lang.Exception e25_05_09_07_35_55_5506ef1a3) {
                java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_35_55_489bd64e4");
            }
            int a = 123;
        }
    }

    class Ci_25_05_09_07_34_25_576 {
        void printLocationMethod_25_05_09_07_34_25_5760520cc() {
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_34_25_576 printLocationMethod_25_05_09_07_34_25_5760520cc");
        }
    }

    class Ci_25_05_09_07_34_57_674 {
        void printLocationMethod_25_05_09_07_34_57_6742b5e68() {
            try {
                Ce_25_05_09_07_32_51_184 ce_25_05_09_07_32_51_184_25_05_09_07_36_58_2249797ea = Ce_25_05_09_07_32_51_184.VALUE2;
                ce_25_05_09_07_32_51_184_25_05_09_07_36_58_2249797ea.method_25_05_09_07_33_21_461cb3dff();
            } catch (java.lang.Exception e25_05_09_07_36_58_2248342d0) {
                java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_33_21_461cb3dff");
            }
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_34_57_674 printLocationMethod_25_05_09_07_34_57_6742b5e68");
        }
    }

    class Ci_25_05_09_07_36_28_161 {
        void printLocationMethod_25_05_09_07_36_28_161a87d98() {
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_36_28_161 printLocationMethod_25_05_09_07_36_28_161a87d98");
        }
    }

    class Ci_25_05_09_07_36_29_303 {
        void printLocationMethod_25_05_09_07_36_29_303183454() {
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_36_29_303 printLocationMethod_25_05_09_07_36_29_303183454");
        }
    }

    class Ci_25_05_09_07_36_56_717 {
        void printLocationMethod_25_05_09_07_36_56_717d1e419() {
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_36_56_717 printLocationMethod_25_05_09_07_36_56_717d1e419");
        }
    }

    class Ci_25_05_09_07_37_23_682 {
        void printLocationMethod_25_05_09_07_37_23_6820409b7() {
            java.lang.System.out.println("Test9257$Ci_25_05_09_07_37_23_682 printLocationMethod_25_05_09_07_37_23_6820409b7");
        }
    }
}class Cg_25_05_09_07_32_27_074<T> extends Test9257 implements Ir_25_05_09_07_32_50_027 , Ir_25_05_09_07_32_28_056 {
    public int method_25_05_09_07_32_27_53447e8fa(long showDuration) throws java.lang.Exception {
        try {
            Cg_25_05_09_07_32_50_335<java.lang.String> cg_25_05_09_07_32_50_335_25_05_09_07_32_50_8095086ef = new Cg_25_05_09_07_32_50_335<java.lang.String>();
            cg_25_05_09_07_32_50_335_25_05_09_07_32_50_8095086ef.printLocationMethod_25_05_09_07_32_50_3355174af();
        } catch (java.lang.Exception e25_05_09_07_32_50_8099da4bb) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_32_50_3355174af");
        }
        try {
            int int_25_05_09_07_32_28_74634ab52 = 50;
            boolean boolean_25_05_09_07_32_28_747caacda = false;
            int int_25_05_09_07_32_28_747db2435 = 64;
            Test9257.iMeth1(int_25_05_09_07_32_28_74634ab52, boolean_25_05_09_07_32_28_747caacda, int_25_05_09_07_32_28_747db2435);
        } catch (java.lang.Exception e25_05_09_07_32_28_7487c3c48) {
            java.lang.System.out.println("Method Invoke Exception: iMeth1");
        }
        try {
            c388.A a_25_05_09_07_34_58_0712f1aaa = new c388.A();
            a_25_05_09_07_34_58_0712f1aaa.method();
        } catch (java.lang.Exception e25_05_09_07_34_58_088e1dde8) {
            java.lang.System.out.println("Method Invoke Exception: method");
        }
        return ((int) (showDuration));
    }

    private java.util.List<T> items25_05_09_07_32_27_074 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_32_27_074(T item25_05_09_07_32_27_074) {
        try {
            c388.D d_25_05_09_07_35_57_237605fc2 = new c388.D();
            d_25_05_09_07_35_57_237605fc2.method();
        } catch (java.lang.Exception e25_05_09_07_35_57_259def591) {
            java.lang.System.out.println("Method Invoke Exception: method");
        }
        try {
            Test9257 test9257_25_05_09_07_34_24_1275de933 = new Test9257.Ci_25_05_09_07_32_49_806();
            Test9257.Ci_25_05_09_07_33_21_667 ci_25_05_09_07_33_21_667_25_05_09_07_34_24_12438deb4 = test9257_25_05_09_07_34_24_1275de933.new Ci_25_05_09_07_33_21_667();
            ci_25_05_09_07_33_21_667_25_05_09_07_34_24_12438deb4.printLocationMethod_25_05_09_07_33_21_6670524ae();
        } catch (java.lang.Exception e25_05_09_07_34_24_150599d99) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_33_21_6670524ae");
        }
        try {
            Cg_25_05_09_07_32_27_074<java.lang.String[]> cg_25_05_09_07_32_27_074_25_05_09_07_32_27_91737d71b = new Cg_25_05_09_07_32_27_074<java.lang.String[]>();
            long long_25_05_09_07_32_27_9175eb532 = 4463841510951674114L;
            cg_25_05_09_07_32_27_074_25_05_09_07_32_27_91737d71b.method_25_05_09_07_32_27_53447e8fa(long_25_05_09_07_32_27_9175eb532);
        } catch (java.lang.Exception e25_05_09_07_32_27_918368295) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_32_27_53447e8fa");
        }
        try {
            Cg_25_05_09_07_32_27_074<java.lang.Byte[]> cg_25_05_09_07_32_27_074_25_05_09_07_33_51_71875b004 = new Cg_25_05_09_07_32_27_074<java.lang.Byte[]>();
            java.lang.String string_25_05_09_07_33_51_72676cddf = "123456abc";
            java.lang.String[] string_arr__25_05_09_07_33_51_719e72885 = new java.lang.String[]{ string_25_05_09_07_33_51_72676cddf };
            cg_25_05_09_07_32_27_074_25_05_09_07_33_51_71875b004.mainTest(string_arr__25_05_09_07_33_51_719e72885);
        } catch (java.lang.Exception e25_05_09_07_33_51_726675305) {
            java.lang.System.out.println("Method Invoke Exception: mainTest");
        }
        try {
            Cg_25_05_09_07_32_27_074<java.lang.String> cg_25_05_09_07_32_27_074_25_05_09_07_33_20_9075e1ecf = new Cg_25_05_09_07_32_27_074<java.lang.String>();
            long long_25_05_09_07_33_20_907c60bf1 = 5455170444610445903L;
            cg_25_05_09_07_32_27_074_25_05_09_07_33_20_9075e1ecf.method_25_05_09_07_32_27_53447e8fa(long_25_05_09_07_33_20_907c60bf1);
        } catch (java.lang.Exception e25_05_09_07_33_20_9084b8b93) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_32_27_53447e8fa");
        }
        try {
            Test9257 test9257_25_05_09_07_34_58_8757e83a2 = new Cg_25_05_09_07_32_27_074();
            Test9257.Ci_25_05_09_07_32_49_806 ci_25_05_09_07_32_49_806_25_05_09_07_34_58_873daeaa0 = test9257_25_05_09_07_34_58_8757e83a2.new Ci_25_05_09_07_32_49_806();
            java.lang.CharSequence charSequence_25_05_09_07_34_58_894227ab4 = null;
            java.lang.CharSequence charSequence_25_05_09_07_34_58_894618d30 = null;
            ci_25_05_09_07_32_49_806_25_05_09_07_34_58_873daeaa0.method_25_05_09_07_33_21_005ae589a(charSequence_25_05_09_07_34_58_894227ab4, charSequence_25_05_09_07_34_58_894618d30);
        } catch (java.lang.Exception e25_05_09_07_34_58_895e1d6d7) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_33_21_005ae589a");
        }
        this.items25_05_09_07_32_27_074.add(item25_05_09_07_32_27_074);
    }

    void printLocationMethod_25_05_09_07_32_27_079d4a418() {
        try {
            c982.test();
        } catch (java.lang.Exception e25_05_09_07_36_59_8005718b6) {
            java.lang.System.out.println("Method Invoke Exception: test");
        }
        try {
            Cg_25_05_09_07_32_50_335<java.lang.Byte> cg_25_05_09_07_32_50_335_25_05_09_07_33_20_605a0d601 = new Cg_25_05_09_07_32_50_335<java.lang.Byte>();
            cg_25_05_09_07_32_50_335_25_05_09_07_33_20_605a0d601.printLocationMethod_25_05_09_07_32_50_3355174af();
        } catch (java.lang.Exception e25_05_09_07_33_20_609076924) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_32_50_3355174af");
        }
        try {
            Cg_25_05_09_07_35_03_073<java.lang.String[]> cg_25_05_09_07_35_03_073_25_05_09_07_36_26_4930beb60 = new Cg_25_05_09_07_35_03_073<java.lang.String[]>();
            cg_25_05_09_07_35_03_073_25_05_09_07_36_26_4930beb60.printLocationMethod_25_05_09_07_35_03_0739b1aaf();
        } catch (java.lang.Exception e25_05_09_07_36_26_4930e3c7d) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_35_03_0739b1aaf");
        }
        try {
            ReferencedInAnnotation referencedInAnnotation_25_05_09_07_35_56_4118d48ef = new ReferencedInAnnotation();
            referencedInAnnotation_25_05_09_07_35_56_4118d48ef.name();
        } catch (java.lang.Exception e25_05_09_07_35_56_4480c6790) {
            java.lang.System.out.println("Method Invoke Exception: name");
        }
        java.lang.System.out.println("Cg_25_05_09_07_32_27_074 printLocationMethod_25_05_09_07_32_27_079d4a418");
    }

    @java.lang.Override
    public void mainTest(java.lang.String[] strArr1) {
        try {
            Test9257 test9257_25_05_09_07_34_27_464ef9d09 = new Test9257.Ci_25_05_09_07_32_49_806();
            Test9257.Ci_25_05_09_07_33_52_127 ci_25_05_09_07_33_52_127_25_05_09_07_34_27_462737d20 = test9257_25_05_09_07_34_27_464ef9d09.new Ci_25_05_09_07_33_52_127();
            ci_25_05_09_07_33_52_127_25_05_09_07_34_27_462737d20.printLocationMethod_25_05_09_07_33_52_127570dd3();
        } catch (java.lang.Exception e25_05_09_07_34_27_509729308) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_33_52_127570dd3");
        }
        try {
            Cg_25_05_09_07_32_27_074<java.lang.String[]> cg_25_05_09_07_32_27_074_25_05_09_07_32_27_5796a451a = new Cg_25_05_09_07_32_27_074<java.lang.String[]>();
            long long_25_05_09_07_32_27_5807015a1 = 1869150479098975625L;
            cg_25_05_09_07_32_27_074_25_05_09_07_32_27_5796a451a.method_25_05_09_07_32_27_53447e8fa(long_25_05_09_07_32_27_5807015a1);
        } catch (java.lang.Exception e25_05_09_07_32_27_580dae222) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_32_27_53447e8fa");
        }
        try {
            Test9257 test9257_25_05_09_07_33_53_179eeb2ea = new Test9257.Ci_25_05_09_07_32_49_806();
            Test9257.Ci_25_05_09_07_32_49_806 ci_25_05_09_07_32_49_806_25_05_09_07_33_53_177a4d6de = test9257_25_05_09_07_33_53_179eeb2ea.new Ci_25_05_09_07_32_49_806();
            ci_25_05_09_07_32_49_806_25_05_09_07_33_53_177a4d6de.printLocationMethod_25_05_09_07_32_49_81089a43b();
        } catch (java.lang.Exception e25_05_09_07_33_53_207ff03be) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_32_49_81089a43b");
        }
        int a = 123;
    }

    protected static Ir_25_05_09_07_32_28_056 field_25_05_09_07_32_28_436;
}@interface Ia_25_05_09_07_32_27_719 {
    public abstract float value_0_25_05_09_07_32_27_719();

    public abstract byte value_1_25_05_09_07_32_27_719();

    public abstract byte value_2_25_05_09_07_32_27_719();

    public abstract int value_3_25_05_09_07_32_27_719();

    public abstract char value_4_25_05_09_07_32_27_719();

    public abstract byte value_5_25_05_09_07_32_27_719();

    public abstract double value_6_25_05_09_07_32_27_719();

    public abstract float value_7_25_05_09_07_32_27_719();

    public abstract boolean value_8_25_05_09_07_32_27_719();

    public abstract long value_9_25_05_09_07_32_27_719();
}interface Ir_25_05_09_07_32_28_056 {}@interface Ia_25_05_09_07_32_29_534 {
    public abstract short value_0_25_05_09_07_32_29_534();

    public abstract short value_1_25_05_09_07_32_29_534();

    public abstract boolean value_2_25_05_09_07_32_29_534();

    public abstract short value_3_25_05_09_07_32_29_534();

    public abstract java.lang.String value_4_25_05_09_07_32_29_534();

    public abstract double value_5_25_05_09_07_32_29_534();

    public abstract java.lang.String value_6_25_05_09_07_32_29_534();

    public abstract char value_7_25_05_09_07_32_29_534();

    public abstract short value_8_25_05_09_07_32_29_534();

    public abstract int value_9_25_05_09_07_32_29_534();
}interface Ir_25_05_09_07_32_49_257 {}interface If_25_05_09_07_32_49_340 extends Ir_25_05_09_07_32_28_056 {
    abstract int apply_25_05_09_07_32_49_340();
}interface Ir_25_05_09_07_32_49_433 extends Ir_25_05_09_07_36_27_982 {}@interface Ia_25_05_09_07_32_49_518 {
    public abstract long value_0_25_05_09_07_32_49_518();

    public abstract java.lang.String value_1_25_05_09_07_32_49_518();

    public abstract java.lang.String value_2_25_05_09_07_32_49_518();

    public abstract boolean value_3_25_05_09_07_32_49_518();

    public abstract short value_4_25_05_09_07_32_49_518();

    public abstract int value_5_25_05_09_07_32_49_518();

    public abstract double value_6_25_05_09_07_32_49_518();

    public abstract float value_7_25_05_09_07_32_49_518();

    public abstract long value_8_25_05_09_07_32_49_518();

    public abstract char value_9_25_05_09_07_32_49_518();
}interface Ir_25_05_09_07_32_50_027 {}class Cg_25_05_09_07_32_50_335<T> {
    private java.util.List<T> items25_05_09_07_32_50_335 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_32_50_335(T item25_05_09_07_32_50_335) {
        try {
            Cg_25_05_09_07_34_26_076<java.lang.Short> cg_25_05_09_07_34_26_076_25_05_09_07_36_54_993d79e5d = new Cg_25_05_09_07_34_26_076<java.lang.Short>();
            cg_25_05_09_07_34_26_076_25_05_09_07_36_54_993d79e5d.printLocationMethod_25_05_09_07_34_26_0777a9605();
        } catch (java.lang.Exception e25_05_09_07_36_54_993c9d815) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_34_26_0777a9605");
        }
        try {
            Ce_25_05_09_07_36_26_789 ce_25_05_09_07_36_26_789_25_05_09_07_36_59_1158512a3 = Ce_25_05_09_07_36_26_789.VALUE1;
            ce_25_05_09_07_36_26_789_25_05_09_07_36_59_1158512a3.printLocationMethod_25_05_09_07_36_26_790cc9f7f();
        } catch (java.lang.Exception e25_05_09_07_36_59_11694a924) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_36_26_790cc9f7f");
        }
        this.items25_05_09_07_32_50_335.add(item25_05_09_07_32_50_335);
    }

    void printLocationMethod_25_05_09_07_32_50_3355174af() {
        try {
            java.lang.String string_25_05_09_07_34_27_0466c437a = "123456abc";
            java.lang.String[] string_arr__25_05_09_07_34_27_038911375 = new java.lang.String[]{ string_25_05_09_07_34_27_0466c437a };
            c437.c437Class.main(string_arr__25_05_09_07_34_27_038911375);
        } catch (java.lang.Exception e25_05_09_07_34_27_0472f5a3b) {
            java.lang.System.out.println("Method Invoke Exception: main");
        }
        java.lang.System.out.println("Cg_25_05_09_07_32_50_335 printLocationMethod_25_05_09_07_32_50_3355174af");
    }
}@interface Ia_25_05_09_07_32_50_428 {
    public abstract short value_0_25_05_09_07_32_50_428();

    public abstract char value_1_25_05_09_07_32_50_428();

    public abstract double value_2_25_05_09_07_32_50_428();

    public abstract boolean value_3_25_05_09_07_32_50_428();

    public abstract short value_4_25_05_09_07_32_50_428();

    public abstract char value_5_25_05_09_07_32_50_428();

    public abstract short value_6_25_05_09_07_32_50_428();

    public abstract short value_7_25_05_09_07_32_50_428();

    public abstract char value_8_25_05_09_07_32_50_428();

    public abstract short value_9_25_05_09_07_32_50_428();
}interface Ir_25_05_09_07_32_50_897 {}interface Ir_25_05_09_07_32_50_972 {}enum Ce_25_05_09_07_32_51_184 implements If_25_05_09_07_36_54_302 , Ir_25_05_09_07_34_58_390 {

    VALUE1,
    VALUE2;

    public int method_25_05_09_07_37_27_422e9dbd7(java.io.File settings) throws java.lang.Exception {
        try {
        } catch (java.lang.Exception e) {
        }
        return -1;
    }

    public int method_25_05_09_07_35_00_470e3d17b(java.util.ArrayList<java.lang.Integer> anArrayList, int index, java.lang.Integer newElement) throws java.lang.Exception {
        anArrayList.set(index, newElement);
        return index;
    }

    public double method_25_05_09_07_33_21_461cb3dff() throws java.lang.Exception {
        if (33 != 65) {
            throw new java.lang.IllegalArgumentException("Vector lengths disagree");
        }
        double sum = 0.0;
        return sum;
    }

    void printLocationMethod_25_05_09_07_32_51_1889714c5() {
        java.lang.System.out.println("Ce_25_05_09_07_32_51_184 printLocationMethod_25_05_09_07_32_51_1889714c5");
    }

    public int apply_25_05_09_07_36_54_302() {
        try {
            Ce_25_05_09_07_32_51_184 ce_25_05_09_07_32_51_184_25_05_09_07_37_27_437bae7d2 = Ce_25_05_09_07_32_51_184.VALUE2;
            java.lang.String string_25_05_09_07_37_27_453b9d126 = "123456abc";
            java.io.File file_25_05_09_07_37_27_4391817aa = new java.io.File(string_25_05_09_07_37_27_453b9d126);
            ce_25_05_09_07_32_51_184_25_05_09_07_37_27_437bae7d2.method_25_05_09_07_37_27_422e9dbd7(file_25_05_09_07_37_27_4391817aa);
        } catch (java.lang.Exception e25_05_09_07_37_27_45363d69d) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_37_27_422e9dbd7");
        }
        return 123123;
    }
}interface If_25_05_09_07_33_19_919 {
    abstract int apply_25_05_09_07_33_19_919();
}enum Ce_25_05_09_07_33_20_256 implements Ir_25_05_09_07_32_49_257 {

    VALUE1,
    VALUE2;

    void printLocationMethod_25_05_09_07_33_20_257a3ea0d() {
        try {
            Test9257 test9257_25_05_09_07_34_24_7477708ec = new Cg_25_05_09_07_32_27_074();
            Test9257.Ci_25_05_09_07_32_49_806 ci_25_05_09_07_32_49_806_25_05_09_07_34_24_74511706e = test9257_25_05_09_07_34_24_7477708ec.new Ci_25_05_09_07_32_49_806();
            int int_25_05_09_07_34_24_785db7c50 = 76;
            ci_25_05_09_07_32_49_806_25_05_09_07_34_24_74511706e.method_25_05_09_07_33_20_0922e9030(int_25_05_09_07_34_24_785db7c50);
        } catch (java.lang.Exception e25_05_09_07_34_24_7865f3693) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_33_20_0922e9030");
        }
        try {
            Test9257 test9257_25_05_09_07_36_25_67860e23a = new Test9257();
            Test9257.Ci_25_05_09_07_32_49_806 ci_25_05_09_07_32_49_806_25_05_09_07_36_25_6765ba424 = test9257_25_05_09_07_36_25_67860e23a.new Ci_25_05_09_07_32_49_806();
            int int_25_05_09_07_36_25_7137ba62b = 35;
            ci_25_05_09_07_32_49_806_25_05_09_07_36_25_6765ba424.method_25_05_09_07_33_20_0922e9030(int_25_05_09_07_36_25_7137ba62b);
        } catch (java.lang.Exception e25_05_09_07_36_25_713195cd4) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_33_20_0922e9030");
        }
        try {
            Cg_25_05_09_07_32_50_335<java.lang.Short[]> cg_25_05_09_07_32_50_335_25_05_09_07_34_26_459e004db = new Cg_25_05_09_07_32_50_335<java.lang.Short[]>();
            java.lang.Short short_25_05_09_07_34_26_4613937dd = ((short) (20896));
            java.lang.Short[] short_arr__25_05_09_07_34_26_460e3bc13 = new java.lang.Short[]{ short_25_05_09_07_34_26_4613937dd };
            cg_25_05_09_07_32_50_335_25_05_09_07_34_26_459e004db.addItem25_05_09_07_32_50_335(short_arr__25_05_09_07_34_26_460e3bc13);
        } catch (java.lang.Exception e25_05_09_07_34_26_462ce6d00) {
            java.lang.System.out.println("Method Invoke Exception: addItem25_05_09_07_32_50_335");
        }
        try {
            Test9257 test9257_25_05_09_07_36_29_096a2ce1c = new Test9257();
            Test9257.Ci_25_05_09_07_34_57_674 ci_25_05_09_07_34_57_674_25_05_09_07_36_29_094c64ff1 = test9257_25_05_09_07_36_29_096a2ce1c.new Ci_25_05_09_07_34_57_674();
            ci_25_05_09_07_34_57_674_25_05_09_07_36_29_094c64ff1.printLocationMethod_25_05_09_07_34_57_6742b5e68();
        } catch (java.lang.Exception e25_05_09_07_36_29_11452f0e4) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_34_57_6742b5e68");
        }
        java.lang.System.out.println("Ce_25_05_09_07_33_20_256 printLocationMethod_25_05_09_07_33_20_257a3ea0d");
    }
}@interface Ia_25_05_09_07_33_20_381 {
    public abstract boolean value_0_25_05_09_07_33_20_381();

    public abstract char value_1_25_05_09_07_33_20_381();

    public abstract long value_2_25_05_09_07_33_20_381();

    public abstract byte value_3_25_05_09_07_33_20_381();

    public abstract long value_4_25_05_09_07_33_20_381();

    public abstract java.lang.String value_5_25_05_09_07_33_20_381();

    public abstract long value_6_25_05_09_07_33_20_381();

    public abstract char value_7_25_05_09_07_33_20_381();

    public abstract int value_8_25_05_09_07_33_20_381();

    public abstract long value_9_25_05_09_07_33_20_381();
}interface If_25_05_09_07_33_21_202 extends If_25_05_09_07_32_49_340 {
    abstract int apply_25_05_09_07_33_21_202();

    public static final Test9257.Ci_25_05_09_07_33_21_667 field_25_05_09_07_33_21_914 = null;
}class Cg_25_05_09_07_33_22_004<T> extends Cr_25_05_09_07_33_52_350 {
    public long method_25_05_09_07_36_55_149b20d8b(java.util.List<java.lang.String> parseExceptionsHolder) throws java.lang.Exception {
        long totalIncrementalBytes = 0L;
        return totalIncrementalBytes;
    }

    private java.util.List<T> items25_05_09_07_33_22_004 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_33_22_004(T item25_05_09_07_33_22_004) {
        this.items25_05_09_07_33_22_004.add(item25_05_09_07_33_22_004);
    }

    void printLocationMethod_25_05_09_07_33_22_0047296ba() {
        java.lang.System.out.println("Cg_25_05_09_07_33_22_004 printLocationMethod_25_05_09_07_33_22_0047296ba");
    }

    private c388.D field_25_05_09_07_35_00_092;

    @java.lang.Override
    public void printLocationMethod_25_05_09_07_33_52_351d45a08() {
        try {
            Cg_25_05_09_07_33_22_004<java.lang.Byte[]> cg_25_05_09_07_33_22_004_25_05_09_07_36_55_155bce756 = new Cg_25_05_09_07_33_22_004<java.lang.Byte[]>();
            java.util.List<java.lang.String> list_25_05_09_07_36_55_159f2c99c = new java.util.ArrayList<java.lang.String>();
            cg_25_05_09_07_33_22_004_25_05_09_07_36_55_155bce756.method_25_05_09_07_36_55_149b20d8b(list_25_05_09_07_36_55_159f2c99c);
        } catch (java.lang.Exception e25_05_09_07_36_55_1596c1982) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_36_55_149b20d8b");
        }
        int a = 123;
    }
}interface If_25_05_09_07_33_52_235 extends If_25_05_09_07_32_49_340 , Ir_25_05_09_07_32_50_972 {
    abstract int apply_25_05_09_07_33_52_235();

    public static final Ir_25_05_09_07_32_28_056 field_25_05_09_07_33_54_621 = null;
}class Cr_25_05_09_07_33_52_350 {
    void printLocationMethod_25_05_09_07_33_52_351d45a08() {
        try {
            Ce_25_05_09_07_34_24_436 ce_25_05_09_07_34_24_436_25_05_09_07_37_25_61833a0d9 = Ce_25_05_09_07_34_24_436.VALUE1;
            ce_25_05_09_07_34_24_436_25_05_09_07_37_25_61833a0d9.printLocationMethod_25_05_09_07_34_24_43692b43e();
        } catch (java.lang.Exception e25_05_09_07_37_25_619e692ea) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_34_24_43692b43e");
        }
        java.lang.System.out.println("Cr_25_05_09_07_33_52_350 printLocationMethod_25_05_09_07_33_52_351d45a08");
    }
}class c437 {
    public static void main(java.lang.String[] args) {
        boolean dontOptimize = true;
        boolean debug = false;
        java.lang.String output = c437.testFunction(dontOptimize, debug);
        java.lang.System.out.println(output);
    }

    public static java.lang.String testFunction(boolean dontOptimize, boolean debug) {
        try {
            Cg_25_05_09_07_33_22_004<java.lang.Byte[]> cg_25_05_09_07_33_22_004_25_05_09_07_35_54_509c77984 = new Cg_25_05_09_07_33_22_004<java.lang.Byte[]>();
            java.lang.Byte byte_25_05_09_07_35_54_511c633b1 = ((byte) (22));
            java.lang.Byte[] byte_arr__25_05_09_07_35_54_510831144 = new java.lang.Byte[]{ byte_25_05_09_07_35_54_511c633b1 };
            cg_25_05_09_07_33_22_004_25_05_09_07_35_54_509c77984.addItem25_05_09_07_33_22_004(byte_arr__25_05_09_07_35_54_510831144);
        } catch (java.lang.Exception e25_05_09_07_35_54_51164acb9) {
            java.lang.System.out.println("Method Invoke Exception: addItem25_05_09_07_33_22_004");
        }
        if ((!dontOptimize) && debug) {
            return "Invalid test configuration";
        }
        java.util.List<java.lang.String> expectedOutput = new java.util.ArrayList<>();
        try {
            Test9257 test9257_25_05_09_07_35_52_524c4e1bb = new Test9257();
            Test9257.Ci_25_05_09_07_34_57_674 ci_25_05_09_07_34_57_674_25_05_09_07_35_52_52297b3d5 = test9257_25_05_09_07_35_52_524c4e1bb.new Ci_25_05_09_07_34_57_674();
            ci_25_05_09_07_34_57_674_25_05_09_07_35_52_52297b3d5.printLocationMethod_25_05_09_07_34_57_6742b5e68();
        } catch (java.lang.Exception e25_05_09_07_35_52_56694456f) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_34_57_6742b5e68");
        }
        expectedOutput.add("I::m");
        expectedOutput.add("c437Class::m");
        c437.A a = new c437.A();
        a.m();
        c437.c437Class.m(new c437.B());
        java.util.List<java.lang.String> actualOutput = new java.util.ArrayList<>();
        actualOutput.add("I::m");
        actualOutput.add("c437Class::m");
        java.util.Optional<java.lang.String> result = expectedOutput.stream().filter((java.lang.String e) -> !actualOutput.contains(e)).findFirst();
        return result.isEmpty() ? "c437 passed" : "c437 failed";
    }

    interface I {
        default void m() {
            java.lang.System.out.println("I::m");
        }
    }

    interface J extends c437.I {}

    interface K extends c437.J {}

    static class A implements c437.K {
        public void m() {
            try {
                Cr_25_05_09_07_33_52_350 cr_25_05_09_07_33_52_350_25_05_09_07_35_02_9200fc595 = new Cr_25_05_09_07_33_52_350();
                cr_25_05_09_07_33_52_350_25_05_09_07_35_02_9200fc595.printLocationMethod_25_05_09_07_33_52_351d45a08();
            } catch (java.lang.Exception e25_05_09_07_35_02_9273bde9e) {
                java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_33_52_351d45a08");
            }
            try {
                Cg_25_05_09_07_33_22_004<java.lang.Short[]> cg_25_05_09_07_33_22_004_25_05_09_07_36_24_646d84468 = new Cg_25_05_09_07_33_22_004<java.lang.Short[]>();
                java.lang.Short short_25_05_09_07_36_24_6473b93cf = ((short) (28067));
                java.lang.Short[] short_arr__25_05_09_07_36_24_646dd8d5c = new java.lang.Short[]{ short_25_05_09_07_36_24_6473b93cf };
                cg_25_05_09_07_33_22_004_25_05_09_07_36_24_646d84468.addItem25_05_09_07_33_22_004(short_arr__25_05_09_07_36_24_646dd8d5c);
            } catch (java.lang.Exception e25_05_09_07_36_24_6475ddc03) {
                java.lang.System.out.println("Method Invoke Exception: addItem25_05_09_07_33_22_004");
            }
            c437.K.super.m();
        }
    }

    static class B implements c437.J {}

    static class c437Class {
        public static void m(c437.J j) {
            java.lang.System.out.println("c437Class::m");
        }

        public static void main(java.lang.String[] args) {
            new c437.A().m();
            c437.c437Class.m(new c437.B());
        }
    }
}interface Ir_25_05_09_07_33_52_737 {}@interface Ia_25_05_09_07_33_54_354 {
    public abstract float value_0_25_05_09_07_33_54_354();

    public abstract char value_1_25_05_09_07_33_54_354();

    public abstract double value_2_25_05_09_07_33_54_354();

    public abstract long value_3_25_05_09_07_33_54_354();

    public abstract short value_4_25_05_09_07_33_54_354();

    public abstract byte value_5_25_05_09_07_33_54_354();

    public abstract float value_6_25_05_09_07_33_54_354();

    public abstract float value_7_25_05_09_07_33_54_354();

    public abstract short value_8_25_05_09_07_33_54_354();

    public abstract short value_9_25_05_09_07_33_54_354();
}enum Ce_25_05_09_07_34_24_436 {

    VALUE1,
    VALUE2;

    void printLocationMethod_25_05_09_07_34_24_43692b43e() {
        java.lang.System.out.println("Ce_25_05_09_07_34_24_436 printLocationMethod_25_05_09_07_34_24_43692b43e");
    }
}interface Ir_25_05_09_07_34_24_934 extends Ir_25_05_09_07_36_29_711 {}class Cg_25_05_09_07_34_26_076<T> {
    private java.util.List<T> items25_05_09_07_34_26_076 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_34_26_076(T item25_05_09_07_34_26_076) {
        this.items25_05_09_07_34_26_076.add(item25_05_09_07_34_26_076);
    }

    void printLocationMethod_25_05_09_07_34_26_0777a9605() {
        java.lang.System.out.println("Cg_25_05_09_07_34_26_076 printLocationMethod_25_05_09_07_34_26_0777a9605");
    }
}class c388 {
    interface InterfaceA {
        default java.lang.String method() {
            return "InterfaceA::method";
        }
    }

    static class InterfaceASub implements c388.InterfaceA {}

    static class A extends c388.InterfaceASub {
        @java.lang.Override
        public java.lang.String method() {
            return "A::method -> " + super.method();
        }
    }

    interface InterfaceB {
        default java.lang.String method() {
            return "InterfaceB::method";
        }
    }

    interface InterfaceBSub extends c388.InterfaceB {}

    static class B implements c388.InterfaceBSub {
        @java.lang.Override
        public java.lang.String method() {
            return "B::method -> " + c388.InterfaceBSub.super.method();
        }

        private Cr_25_05_09_07_33_52_350 field_25_05_09_07_35_01_378;
    }

    interface InterfaceC {
        default java.lang.String method() {
            return "InterfaceC::method";
        }
    }

    static class InterfaceCSub implements c388.InterfaceC {
        @java.lang.Override
        public java.lang.String method() {
            return c388.InterfaceC.super.method();
        }
    }

    static class C extends c388.InterfaceCSub {
        @java.lang.Override
        public java.lang.String method() {
            return "C::method -> " + super.method();
        }
    }

    interface InterfaceD {
        default java.lang.String method() {
            return "InterfaceD::method";
        }
    }

    interface InterfaceDSub extends c388.InterfaceD {
        @java.lang.Override
        default java.lang.String method() {
            return c388.InterfaceD.super.method();
        }
    }

    static class D implements c388.InterfaceDSub {
        @java.lang.Override
        public java.lang.String method() {
            return "D::method -> " + c388.InterfaceDSub.super.method();
        }
    }

    public static void main(java.lang.String[] args) {
        var expectedOutput = java.util.List.of("A::method -> InterfaceA::method", "B::method -> InterfaceB::method", "C::method -> InterfaceC::method", "D::method -> InterfaceD::method");
        var actualOutput = c388.testFunction();
        boolean isPassed = true;
        for (int i = 0; i < expectedOutput.size(); i++) {
            if (!expectedOutput.get(i).equals(actualOutput.get(i))) {
                isPassed = false;
                break;
            }
        }
        java.util.Optional.of(isPassed).filter((java.lang.Boolean passed) -> passed).ifPresentOrElse((java.lang.Boolean passed) -> java.lang.System.out.println("c388 passed"), () -> java.lang.System.out.println("c388 failed"));
    }

    private static java.util.List<java.lang.String> testFunction() {
        java.util.List<java.lang.String> output = new java.util.ArrayList<>();
        output.add(new c388.A().method());
        output.add(new c388.B().method());
        output.add(new c388.C().method());
        output.add(new c388.D().method());
        return output;
    }
}class Cr_25_05_09_07_34_27_663 {
    void printLocationMethod_25_05_09_07_34_27_663ed4557() {
        try {
            Test9257 test9257_25_05_09_07_37_27_049fd0a83 = new Test9257();
            Test9257.Ci_25_05_09_07_36_56_717 ci_25_05_09_07_36_56_717_25_05_09_07_37_27_0485f4e93 = test9257_25_05_09_07_37_27_049fd0a83.new Ci_25_05_09_07_36_56_717();
            ci_25_05_09_07_36_56_717_25_05_09_07_37_27_0485f4e93.printLocationMethod_25_05_09_07_36_56_717d1e419();
        } catch (java.lang.Exception e25_05_09_07_37_27_063e136f4) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_36_56_717d1e419");
        }
        java.lang.System.out.println("Cr_25_05_09_07_34_27_663 printLocationMethod_25_05_09_07_34_27_663ed4557");
    }
}interface Ir_25_05_09_07_34_27_999 {}class Cr_25_05_09_07_34_28_136 {
    void printLocationMethod_25_05_09_07_34_28_136647927() {
        java.lang.System.out.println("Cr_25_05_09_07_34_28_136 printLocationMethod_25_05_09_07_34_28_136647927");
    }
}@interface Ia_25_05_09_07_34_58_215 {
    public abstract long value_0_25_05_09_07_34_58_215();

    public abstract double value_1_25_05_09_07_34_58_215();

    public abstract float value_2_25_05_09_07_34_58_215();

    public abstract short value_3_25_05_09_07_34_58_215();

    public abstract boolean value_4_25_05_09_07_34_58_215();

    public abstract double value_5_25_05_09_07_34_58_215();

    public abstract boolean value_6_25_05_09_07_34_58_215();

    public abstract int value_7_25_05_09_07_34_58_215();

    public abstract int value_8_25_05_09_07_34_58_215();

    public abstract byte value_9_25_05_09_07_34_58_215();
}interface Ir_25_05_09_07_34_58_390 {
    public static final c388.InterfaceDSub field_25_05_09_07_37_27_283 = null;
}@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@interface MyAnnotation {
    java.lang.Class<?> value();
}interface Annotated {
    default java.util.Optional<java.lang.Class<?>> getAnnotationValue(java.lang.Class<?> clazz) {
        MyAnnotation annotation = clazz.getAnnotation(MyAnnotation.class);
        return annotation != null ? java.util.Optional.of(annotation.value()) : java.util.Optional.empty();
    }
}sealed interface Referenced
    permits ReferencedInAnnotation {
    java.lang.String name();
}record ReferencedInAnnotation() implements Referenced {
    @java.lang.Override
    public java.lang.String name() {
        return "ReferencedInAnnotation";
    }
}@MyAnnotation(ReferencedInAnnotation.class)
class c982 extends Cr_25_05_09_07_33_52_350 implements Annotated {
    public int method_25_05_09_07_36_56_085cbe71e(java.lang.String valueP, int radix, java.lang.Number maxValue, java.lang.Number minValue) throws java.lang.Exception {
        boolean isInteger = maxValue.getClass().getSimpleName().equals("Integer");
        try {
            if (isInteger) {
            } else {
            }
        } catch (java.lang.Exception e) {
            java.math.BigInteger bi = new java.math.BigInteger(valueP, radix);
            long maxValueL = (isInteger) ? maxValue.longValue() : ((long) (maxValue));
            if (bi.compareTo(java.math.BigInteger.valueOf(maxValueL)) > 0) {
                throw new java.lang.NumberFormatException(((((("Value \"" + valueP) + "\"is greater than the maximum ") + maxValue.getClass().getSimpleName()) + " value ") + maxValue) + " !");
            }
            long minValueL = (isInteger) ? minValue.longValue() : ((long) (minValue));
            if (bi.compareTo(java.math.BigInteger.valueOf(minValueL)) < 0) {
                throw new java.lang.NumberFormatException(((((("Value \"" + valueP) + "\" is  less than the minimum ") + minValue.getClass().getSimpleName()) + " value ") + minValue) + " !");
            }
            throw new java.lang.NumberFormatException(e.getMessage());
        }
        return radix;
    }

    public static void main(java.lang.String[] args) {
        var main = new c982();
        java.util.Optional<java.lang.Class<?>> annotationValue = main.getAnnotationValue(c982.class);
        if (annotationValue.isPresent()) {
            java.lang.Class<?> clazz = annotationValue.get();
            if (Referenced.class.isAssignableFrom(clazz)) {
                java.lang.System.out.println(((Referenced) (new ReferencedInAnnotation())).name());
            }
        } else {
            java.lang.System.out.println("No annotation found");
        }
    }

    public static void test() {
        c982.main(new java.lang.String[]{  });
    }

    @java.lang.Override
    public void printLocationMethod_25_05_09_07_33_52_351d45a08() {
        try {
            c982 c982_25_05_09_07_36_56_106c036c0 = new c982();
            java.lang.String string_25_05_09_07_36_56_144d4c4d0 = "123456abc";
            int int_25_05_09_07_36_56_144ba86c6 = 42;
            java.lang.Number number_25_05_09_07_36_56_1452dad56 = null;
            java.lang.Number number_25_05_09_07_36_56_1457c05a3 = null;
            c982_25_05_09_07_36_56_106c036c0.method_25_05_09_07_36_56_085cbe71e(string_25_05_09_07_36_56_144d4c4d0, int_25_05_09_07_36_56_144ba86c6, number_25_05_09_07_36_56_1452dad56, number_25_05_09_07_36_56_1457c05a3);
        } catch (java.lang.Exception e25_05_09_07_36_56_1450c5395) {
            java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_36_56_085cbe71e");
        }
        int a = 123;
    }
}interface Ir_25_05_09_07_34_59_288 {}@interface Ia_25_05_09_07_35_00_282 {
    public abstract int value_0_25_05_09_07_35_00_282();

    public abstract long value_1_25_05_09_07_35_00_282();

    public abstract java.lang.String value_2_25_05_09_07_35_00_282();

    public abstract java.lang.String value_3_25_05_09_07_35_00_282();

    public abstract byte value_4_25_05_09_07_35_00_282();

    public abstract int value_5_25_05_09_07_35_00_282();

    public abstract char value_6_25_05_09_07_35_00_282();

    public abstract char value_7_25_05_09_07_35_00_282();

    public abstract int value_8_25_05_09_07_35_00_282();

    public abstract char value_9_25_05_09_07_35_00_282();
}@interface Ia_25_05_09_07_35_00_658 {
    public abstract char value_0_25_05_09_07_35_00_658();

    public abstract boolean value_1_25_05_09_07_35_00_658();

    public abstract java.lang.String value_2_25_05_09_07_35_00_658();

    public abstract boolean value_3_25_05_09_07_35_00_658();

    public abstract int value_4_25_05_09_07_35_00_658();

    public abstract double value_5_25_05_09_07_35_00_658();

    public abstract byte value_6_25_05_09_07_35_00_658();

    public abstract long value_7_25_05_09_07_35_00_658();

    public abstract boolean value_8_25_05_09_07_35_00_658();

    public abstract double value_9_25_05_09_07_35_00_658();
}class Cr_25_05_09_07_35_01_548 {
    public boolean method_25_05_09_07_35_54_8596e36f2() throws java.lang.Exception {
        return false;
    }

    void printLocationMethod_25_05_09_07_35_01_5483eeb1e() {
        java.lang.System.out.println("Cr_25_05_09_07_35_01_548 printLocationMethod_25_05_09_07_35_01_5483eeb1e");
    }
}interface If_25_05_09_07_35_02_292 extends Ir_25_05_09_07_32_50_897 {
    abstract int apply_25_05_09_07_35_02_292();
}class Cg_25_05_09_07_35_03_073<T> {
    private java.util.List<T> items25_05_09_07_35_03_073 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_35_03_073(T item25_05_09_07_35_03_073) {
        this.items25_05_09_07_35_03_073.add(item25_05_09_07_35_03_073);
    }

    void printLocationMethod_25_05_09_07_35_03_0739b1aaf() {
        java.lang.System.out.println("Cg_25_05_09_07_35_03_073 printLocationMethod_25_05_09_07_35_03_0739b1aaf");
    }
}enum Ce_25_05_09_07_35_53_961 {

    VALUE1,
    VALUE2;

    void printLocationMethod_25_05_09_07_35_53_961871763() {
        java.lang.System.out.println("Ce_25_05_09_07_35_53_961 printLocationMethod_25_05_09_07_35_53_961871763");
    }
}enum Ce_25_05_09_07_35_55_027 {

    VALUE1,
    VALUE2;

    void printLocationMethod_25_05_09_07_35_55_02761365a() {
        java.lang.System.out.println("Ce_25_05_09_07_35_55_027 printLocationMethod_25_05_09_07_35_55_02761365a");
    }
}interface Ir_25_05_09_07_35_55_182 {}@interface Ia_25_05_09_07_35_55_337 {
    public abstract char value_0_25_05_09_07_35_55_337();

    public abstract double value_1_25_05_09_07_35_55_337();

    public abstract double value_2_25_05_09_07_35_55_337();

    public abstract char value_3_25_05_09_07_35_55_337();

    public abstract int value_4_25_05_09_07_35_55_337();

    public abstract float value_5_25_05_09_07_35_55_337();

    public abstract char value_6_25_05_09_07_35_55_337();

    public abstract boolean value_7_25_05_09_07_35_55_337();

    public abstract int value_8_25_05_09_07_35_55_337();

    public abstract float value_9_25_05_09_07_35_55_337();
}@interface Ia_25_05_09_07_35_55_738 {
    public abstract boolean value_0_25_05_09_07_35_55_738();

    public abstract boolean value_1_25_05_09_07_35_55_738();

    public abstract int value_2_25_05_09_07_35_55_738();

    public abstract double value_3_25_05_09_07_35_55_738();

    public abstract byte value_4_25_05_09_07_35_55_738();

    public abstract float value_5_25_05_09_07_35_55_738();

    public abstract char value_6_25_05_09_07_35_55_738();

    public abstract boolean value_7_25_05_09_07_35_55_738();

    public abstract java.lang.String value_8_25_05_09_07_35_55_738();

    public abstract long value_9_25_05_09_07_35_55_738();
}class Cg_25_05_09_07_35_57_428<T> {
    private java.util.List<T> items25_05_09_07_35_57_428 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_35_57_428(T item25_05_09_07_35_57_428) {
        this.items25_05_09_07_35_57_428.add(item25_05_09_07_35_57_428);
    }

    void printLocationMethod_25_05_09_07_35_57_431065a5c() {
        java.lang.System.out.println("Cg_25_05_09_07_35_57_428 printLocationMethod_25_05_09_07_35_57_431065a5c");
    }
}class c543 {
    public static void main(java.lang.String[] args) {
        java.lang.String expectedOutput = "Hello world!";
        if (c543.isDexRuntime() && c543.isDexVmVersion6_0_1()) {
            expectedOutput = " world! world!";
        }
        java.lang.String actualOutput = c543.testRedundantFieldLoadElimination();
        java.lang.System.out.println(actualOutput);
        if (!actualOutput.equals(expectedOutput)) {
            java.lang.System.out.println(((("c543 failed: Expected '" + expectedOutput) + "', but got '") + actualOutput) + "'");
        } else {
            java.lang.System.out.println("c543 passed!");
        }
    }

    private static java.lang.String testRedundantFieldLoadElimination() {
        c543.c543Class.main(new java.lang.String[]{  });
        return c543.c543Class.greeting;
    }

    private static boolean isDexRuntime() {
        return true;
    }

    private static boolean isDexVmVersion6_0_1() {
        return true;
    }

    static class c543Class {
        static java.lang.String greeting = " world!";

        public static void main(java.lang.String[] args) {
            java.lang.String worldGreeting = c543.c543Class.greeting;
            new c543.HelloGreeter(c543.c543Class.greeting);
            java.lang.System.out.println(worldGreeting);
        }
    }

    static class HelloGreeter {
        static {
            c543.c543Class.greeting = "Hello";
        }

        HelloGreeter(java.lang.String helloGreeting) {
            java.lang.System.out.print(helloGreeting);
        }
    }

    interface GreetingProvider {
        default java.lang.String provideGreeting() {
            return "Default Greeting";
        }
    }

    static class GreetingClass extends c388.B implements c543.GreetingProvider , c543.GreetingType {
        public long method_25_05_09_07_36_29_90994896c(java.lang.String patternString, java.lang.String url) throws java.lang.Exception {
            java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(patternString);
            java.util.regex.Matcher matcher = pattern.matcher(url);
            if (matcher.find()) {
                return java.lang.Long.parseLong(matcher.group(1));
            }
            return -1;
        }

        private final java.lang.String message;

        GreetingClass(java.lang.String message) {
            this.message = message;
        }

        @java.lang.Override
        public java.lang.String provideGreeting() {
            return message;
        }

        @java.lang.Override
        public java.lang.String getGreeting() {
            return provideGreeting();
        }

        @java.lang.Override
        public java.lang.String method() {
            java.lang.String string_25_05_09_07_36_29_9377e17a7 = "123456abc";
            try {
                java.lang.String string_25_05_09_07_36_29_959eed7a6 = "123456abc";
                c543.GreetingClass greetingClass_25_05_09_07_36_29_9380ac544 = new c543.GreetingClass(string_25_05_09_07_36_29_959eed7a6);
                java.lang.String string_25_05_09_07_36_29_9692f0023 = "123456abc";
                java.lang.String string_25_05_09_07_36_29_96902d00c = "123456abc";
                greetingClass_25_05_09_07_36_29_9380ac544.method_25_05_09_07_36_29_90994896c(string_25_05_09_07_36_29_9692f0023, string_25_05_09_07_36_29_96902d00c);
            } catch (java.lang.Exception e25_05_09_07_36_29_96950ea47) {
                java.lang.System.out.println("Method Invoke Exception: method_25_05_09_07_36_29_90994896c");
            }
            return string_25_05_09_07_36_29_9377e17a7;
        }
    }

    interface GreetingType {
        java.lang.String getGreeting();
    }

    static {
        java.util.List<c543.GreetingType> greetings = new java.util.ArrayList<>();
        greetings.add(new c543.GreetingClass("Hello from Class"));
        java.lang.StringBuilder combinedGreeting = new java.lang.StringBuilder();
        for (c543.GreetingType greeting : greetings) {
            combinedGreeting.append(greeting.getGreeting()).append(" ");
        }
        java.lang.String result = (combinedGreeting.length() > 0) ? combinedGreeting.substring(0, combinedGreeting.length() - 1) : "";
        java.util.Optional.of(result).ifPresent(java.lang.System.out::println);
    }
}enum Ce_25_05_09_07_36_26_789 {

    VALUE1,
    VALUE2;

    void printLocationMethod_25_05_09_07_36_26_790cc9f7f() {
        try {
            Cg_25_05_09_07_35_57_428<java.lang.String[]> cg_25_05_09_07_35_57_428_25_05_09_07_37_23_54564c553 = new Cg_25_05_09_07_35_57_428<java.lang.String[]>();
            cg_25_05_09_07_35_57_428_25_05_09_07_37_23_54564c553.printLocationMethod_25_05_09_07_35_57_431065a5c();
        } catch (java.lang.Exception e25_05_09_07_37_23_546584275) {
            java.lang.System.out.println("Method Invoke Exception: printLocationMethod_25_05_09_07_35_57_431065a5c");
        }
        java.lang.System.out.println("Ce_25_05_09_07_36_26_789 printLocationMethod_25_05_09_07_36_26_790cc9f7f");
    }
}interface Ir_25_05_09_07_36_27_982 {}class Cg_25_05_09_07_36_28_310<T> {
    private java.util.List<T> items25_05_09_07_36_28_310 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_36_28_310(T item25_05_09_07_36_28_310) {
        this.items25_05_09_07_36_28_310.add(item25_05_09_07_36_28_310);
    }

    void printLocationMethod_25_05_09_07_36_28_3112c7b34() {
        java.lang.System.out.println("Cg_25_05_09_07_36_28_310 printLocationMethod_25_05_09_07_36_28_3112c7b34");
    }
}interface Ir_25_05_09_07_36_29_711 {}interface If_25_05_09_07_36_54_302 {
    abstract int apply_25_05_09_07_36_54_302();
}@interface Ia_25_05_09_07_36_55_650 {
    public abstract int value_0_25_05_09_07_36_55_650();

    public abstract char value_1_25_05_09_07_36_55_650();

    public abstract long value_2_25_05_09_07_36_55_650();

    public abstract double value_3_25_05_09_07_36_55_650();

    public abstract char value_4_25_05_09_07_36_55_650();

    public abstract boolean value_5_25_05_09_07_36_55_650();

    public abstract double value_6_25_05_09_07_36_55_650();

    public abstract float value_7_25_05_09_07_36_55_650();

    public abstract double value_8_25_05_09_07_36_55_650();

    public abstract long value_9_25_05_09_07_36_55_650();
}enum Ce_25_05_09_07_36_55_942 {

    VALUE1,
    VALUE2;

    public boolean method_25_05_09_07_36_56_91479f089(int family, int prefixLength) {
        return switch (family) {
            case 1 ->
                (prefixLength >= 0) && (prefixLength <= 32);
            case 2 ->
                (prefixLength >= 0) && (prefixLength <= 128);
            default ->
                false;
        } && (prefixLength < 256);
    }

    void printLocationMethod_25_05_09_07_36_55_94350adee() {
        java.lang.System.out.println("Ce_25_05_09_07_36_55_942 printLocationMethod_25_05_09_07_36_55_94350adee");
    }
}@interface Ia_25_05_09_07_36_56_345 {
    public abstract double value_0_25_05_09_07_36_56_345();

    public abstract double value_1_25_05_09_07_36_56_345();

    public abstract float value_2_25_05_09_07_36_56_345();

    public abstract short value_3_25_05_09_07_36_56_345();

    public abstract byte value_4_25_05_09_07_36_56_345();

    public abstract byte value_5_25_05_09_07_36_56_345();

    public abstract float value_6_25_05_09_07_36_56_345();

    public abstract double value_7_25_05_09_07_36_56_345();

    public abstract long value_8_25_05_09_07_36_56_345();

    public abstract boolean value_9_25_05_09_07_36_56_345();
}enum Ce_25_05_09_07_36_56_519 {

    VALUE1,
    VALUE2;

    void printLocationMethod_25_05_09_07_36_56_519467b65() {
        java.lang.System.out.println("Ce_25_05_09_07_36_56_519 printLocationMethod_25_05_09_07_36_56_519467b65");
    }
}interface Ir_25_05_09_07_36_57_232 {}interface If_25_05_09_07_36_58_356 {
    abstract int apply_25_05_09_07_36_58_356();
}@interface Ia_25_05_09_07_36_58_473 {
    public abstract java.lang.String value_0_25_05_09_07_36_58_473();

    public abstract byte value_1_25_05_09_07_36_58_473();

    public abstract byte value_2_25_05_09_07_36_58_473();

    public abstract boolean value_3_25_05_09_07_36_58_473();

    public abstract double value_4_25_05_09_07_36_58_473();

    public abstract long value_5_25_05_09_07_36_58_473();

    public abstract java.lang.String value_6_25_05_09_07_36_58_473();

    public abstract short value_7_25_05_09_07_36_58_473();

    public abstract byte value_8_25_05_09_07_36_58_473();

    public abstract char value_9_25_05_09_07_36_58_473();
}interface If_25_05_09_07_37_22_819 {
    abstract int apply_25_05_09_07_37_22_819();
}class c130 {
    public static void main(java.lang.String[] args) {
        c130.Host.bar(new c130.Input());
        c130.Host.bar(null);
        c130.Host.bar(new c130.ExtendedInput());
    }

    static class Host {
        private static final c130.Host.Companion companion = new c130.Host.Companion();

        static void bar(java.lang.Object arg) {
            c130.Host.companion.foo(arg);
        }

        static class Companion {
            public void foo(java.lang.Object arg) {
                java.lang.String result;
                if (arg instanceof c130.Input) {
                    if (arg instanceof c130.ExtendedInput) {
                        result = "ExtendedInput";
                    } else if (arg instanceof c130.PrintableInput) {
                        result = "PrintableInput";
                    } else {
                        result = "Input";
                    }
                } else if (arg == null) {
                    result = "null";
                } else {
                    result = "Unknown";
                }
                java.lang.System.out.println(result);
            }
        }
    }

    static class Input {}

    static class ExtendedInput extends c130.Input {}

    interface Printable {
        default void print() {
            java.lang.System.out.println("Printable");
        }
    }

    static class PrintableInput extends c130.Input implements c130.Printable {}
}class Cr_25_05_09_07_37_26_190 {
    void printLocationMethod_25_05_09_07_37_26_1900bb1b2() {
        java.lang.System.out.println("Cr_25_05_09_07_37_26_190 printLocationMethod_25_05_09_07_37_26_1900bb1b2");
    }
}class Cr_25_05_09_07_37_27_581 {
    void printLocationMethod_25_05_09_07_37_27_5827255eb() {
        java.lang.System.out.println("Cr_25_05_09_07_37_27_581 printLocationMethod_25_05_09_07_37_27_5827255eb");
    }
}class Cg_25_05_09_07_37_27_759<T> {
    private java.util.List<T> items25_05_09_07_37_27_759 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_37_27_759(T item25_05_09_07_37_27_759) {
        this.items25_05_09_07_37_27_759.add(item25_05_09_07_37_27_759);
    }

    void printLocationMethod_25_05_09_07_37_27_7599a92b5() {
        java.lang.System.out.println("Cg_25_05_09_07_37_27_759 printLocationMethod_25_05_09_07_37_27_7599a92b5");
    }
}class Cg_25_05_09_07_37_27_966<T> {
    private java.util.List<T> items25_05_09_07_37_27_966 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_37_27_966(T item25_05_09_07_37_27_966) {
        this.items25_05_09_07_37_27_966.add(item25_05_09_07_37_27_966);
    }

    void printLocationMethod_25_05_09_07_37_27_967e60ab9() {
        java.lang.System.out.println("Cg_25_05_09_07_37_27_966 printLocationMethod_25_05_09_07_37_27_967e60ab9");
    }
}class Cg_25_05_09_07_37_28_184<T> {
    private java.util.List<T> items25_05_09_07_37_28_184 = new java.util.ArrayList<T>();

    public void addItem25_05_09_07_37_28_184(T item25_05_09_07_37_28_184) {
        this.items25_05_09_07_37_28_184.add(item25_05_09_07_37_28_184);
    }

    void printLocationMethod_25_05_09_07_37_28_184047b70() {
        System.out.println("Cg_25_05_09_07_37_28_184 printLocationMethod_25_05_09_07_37_28_184047b70");;
    }
}
