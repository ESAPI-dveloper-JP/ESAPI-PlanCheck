---
transition: view-transition
mdc: true
fonts:
  # 標準テキスト用
  sans: Noto Sans JP
  # UnoCSS で font-serif クラスを指定したとき用
  serif: Noto Serif JP
  # コードブロック用
  mono: Fira Code


---

第20回九州放射線医療技術学術大会　ハンズオンセミナーI
# Eclipse Scripting APIを用いた<br>効率的なプランチェックの実践 

例題・演習テキスト  {.text-2xl}  
  
柴山　祐亮 {.text-2xl}  
九州大学別府病院　診療放射線室 {.text-2xl}   
九州大学大学院医学系学府　保健学専攻 {.text-2xl}

<div class="absolute upper-20 left-12 p-2 text-sm opacity-80">
QR700030848 <br>
放射線治療計画用ソフトウェア Eclipse：承認番号 22900BZX00265000　
</div>

---


<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
1
</div>

第20回九州放射線医療技術学術大会　ハンズオンセミナーI
# この研究発表の内容に関する利益相反事項は，
　　
　　
<br>

 <br>
 
 ✅　あります {.text-3xl}
 
 <br>　　

講演料：　バリアンメディカルシステムズ {.text-2xl}  

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
2
</div>

# 例題①: 患者名・IDの取得・表示

<p class="text-2xl">
🎯現在開かれている <u>患者名</u> と <u>ID</u> の取得・表示
</p>
            
✅ ヒント：現在Eclipse上でアクティブな患者情報はcontext内に`Patient`オブジェクトとして格納される  
✅ ヒント：ESAPI Helpで`Patient`クラスを参照してみましょう  
✅ ヒント：`Patient`オブジェクトからName, Id を取り出し, `MessageBox(string, string)`で表示  

```csharp
    //Example-1
    Patient patient = context.Patient;// アクティブな患者データを取得し，変数'patient'に代入            
    string patientname = patient.Name;// 患者データから患者名を取得しstring型変数'patientname'に代入            
    string patientid = patient.Id;// 患者データから患者IDを取得しstring型変数'patientid'に代入

    MessageBox.Show("PatientName: " + "\t" + patientname + "\n"
                    + "Patient ID: " + "\t" + patientid + "\n",
                    "Example1: Patient Information");//見やすいフォーマットで表示  

```

ESAPI の各プロパティは「値型」または「参照型」として定義されており, 戻り値の型が明確<br>
そのため、次のように var を用いて型推論することも可能<br>
例：`var patient = context.Patient;`

本演習では、学習のため明示的な型宣言を使用します<br>
例：`Patient patient = context.Patient`;

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
3
</div>

# 演習①: プランID・コースIDの取得・表示 

<p class="text-2xl">
🎯現在開かれている<u>プランID</u>・<u>コースID</u>を取得・表示してみましょう
</p>  

✅ ヒント：現在アクティブなプランは`context`内の`ExternalPlanSetup`オブジェクトとして格納される
✅ ヒント：ESAPI Helpで`ExternalPlanSetup`クラスを参照してみましょう  
✅ ヒント：`ExternalPlanSetup`内から Plan ID, Course ID を取得して`MessageBox`で表示

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
4
</div>

# 演習①: プランID・コースIDの取得・表示 

<p class="text-2xl">
🎯現在開かれている<u>プランID</u>・<u>コースID</u>を取得・表示してみましょう
</p>

✅ ヒント：現在アクティブなプランは`context`内の`ExternalPlanSetup`オブジェクトとして格納される
✅ ヒント：ESAPI Helpで`ExternalPlanSetup`クラスを参照してみましょう  
✅ ヒント：`ExternalPlanSetup`内から Plan ID, Course ID を取得して`MessageBox`で表示

```csharp
    //Practice-1: コード例
    ExternalPlanSetup plan = context.ExternalPlanSetup;// アクティブなプランデータを変数'plan'に代入
    string planid = plan.Id;//プランIDを'planid'に代入
    string courseid = plan.Course.Id;//コースデータ内のIdにアクセスし'courseid'に代入

    //表示するメッセージを先に定義することで可読性up
    string msg = "PatientName: " + "\t" + patientname + "\n"
                + "Patient ID: " + "\t" + patientid + "\n"
                + "Course ID: " + "\t" + courseid + "\n"
                + "Plan ID: " + "\t\t" + planid + "\n";

    MessageBox.Show(msg, "Practice 1", MessageBoxButton.OK);

```


---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
5
</div>

# 例題②: プラン情報・線量情報の取得表示
<p class="text-5.5xl">
🎯<u>1回線量</u>，<u>分割回数</u>，<u>標的体積</u>，<u>線量正規化</u>，<u>計算アルゴリズム</u>，<u>計算グリッドサイズ</u>の表示</p>

✅ ヒント: 数値型(`int`, `double`など)のプロパティ値は`ToString()`メソッドで文字列に変換

```csharp
    //Example-2
    string doseperfraction = plan.DosePerFraction.ToString();//1回線量
    string fractions = plan.NumberOfFractions.ToString();//分割回数   

    string target = plan.TargetVolumeID;//標的体積名．PTVなど          
    string normalization = plan.PlanNormalizationMethod;//線量正規化方法
    string algorithm = plan.PhotonCalculationModel;//計算アルゴリズム名

    Dose dose = plan.Dose;
    double grid_x = dose.XRes;//グリッドサイズ_X方向
    double grid_y = dose.YRes;//ボクセルサイズ_Y方向
    double grid_z = dose.ZRes;//ボクセルサイズ_Z方向

```

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
6
</div>

# 例題②: プラン情報・線量情報の取得表示

💡MessageBox.Showを用いて取得情報を表示　{.text-5.5xl} 

↓のコードを前ページのコードの後に続けてコピペしてください

```csharp
    //Example-2 表示するメッセージを先に定義することで可読性up
    string msg1 = string.Format(@"
    PatientName: {0}
    Patient ID: {1}
    Course ID: {2}
    Plan ID: {3}

    *Dose Information:
    Dose Per Fraction: {4}
    Number Of Fractions: {5}
    Target Structure: {6}
    Plan Normalization: {7}
    Algorithm: {8}
    Grid Size X: {9:F2} mm
    Grid Size Y: {10:F2} mm
    Grid Size Z: {11:F2} mm",
    patientname, patientid, courseid, planid, doseperfraction, fractions, 
    target, normalization, algorithm, grid_x, grid_y, grid_z);

    MessageBox.Show(msg1, "Example 2", MessageBoxButton.OK);

```

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
7
</div>

# 演習②: CT情報の取得・表示
<p class="text-5.5xl">
🎯<u>Image ID</u>, <u>スタディID</u>, <u>スタディ名</u>, <u>シリーズID</u>, <u>シリーズ名</u>, <u>撮影装置名</u>, <u>ボクセルサイズ</u>を表示してください 
</p>

✅ ヒント：`StructureSet` と `Image` は紐づく（StructureSetが参照する画像）  
✅ ヒント：ESAPI Helpで`StructureSet`クラスを参照してみましょう

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
8
</div>

# 演習②: CT情報の取得・表示

<p class="text-5.5xl">
🎯<u>Image ID</u>, <u>スタディID</u>, <u>スタディ名</u>, <u>シリーズID</u>, <u>シリーズ名</u>, <u>撮影装置名</u>, <u>ボクセルサイズ</u>を表示してください 
</p>

✅ ヒント：`StructureSet` と `Image` は紐づく（StructureSetが参照する画像）  
✅ ヒント：ESAPI Helpで`StructureSet`クラスを参照してみましょう

```csharp
    //Practice 2: コード例
    StructureSet ss = context.StructureSet;// ストラクチャセット（Structureの集合）
    Image image = ss.Image;// StructureSetが参照している画像
                            // NOTE: DICOM階層は Study > Series > Image．

    string image_id = image.Id;//Image ID
    string study_id = image.Series.Study.Id;//Study ID
    string study_name = image.Series.Study.Name;//Study名
    string series_id = image.Series.Id;//シリーズID
    string series_name = image.Series.Name;//シリーズ名

    string CTdeviceid = image.Series.ImagingDeviceId;  //撮影装置のIDの取得．CT-ED変換テーブルに対応

    Nullable<DateTime> creationdate = image.CreationDateTime;
    double x_res = image.XRes;//ボクセルサイズ_X方向
    double y_res = image.YRes;//ボクセルサイズ_Y方向
    double z_res = image.ZRes;//ボクセルサイズ_Z方向(＝スライス厚)

```
---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
9
</div>

# 演習②: CT情報の取得・表示

💡MessageBox.Showを用いた取得情報の表示　{.text-5.5xl} <br>
✅１ページ前のコードの後に続けてコピペ

<div class="scrollable-code">
```csharp
    string msg2 = string.Format(@"
    PatientName: {0}
    Patient ID: {1}
    Course ID: {2}
    Plan ID: {3}

    *Dose Information:
    Dose Per Fraction: {4}
    Number Of Fractions: {5}
    Target Structure: {6}
    Plan Normalization: {7}
    Algorithm: {8}
    Grid Size X: {9:F2} mm
    Grid Size Y: {10:F2} mm
    Grid Size Z: {11:F2} mm

    *CT Information
    Image ID: {12}
    Study ID: {13}
    Study Name: {14}
    Series ID: {15}
    Series Name: {16}
    CT device ID: {17}
    Creation Date: {18}
    X Voxel Size: {19:F2} mm
    Y Voxel Size: {20:F2} mm
    Z Voxel Size: {21:F2} mm",
    patientname, patientid, courseid, planid,
    doseperfraction, fractions, target, normalization, algorithm,
    grid_x, grid_y, grid_z,
    image_id, study_id, study_name, series_id, series_name,
    CTdeviceid, creationdate, x_res, y_res, z_res);
  
    MessageBox.Show(msg2, "Practice 2", MessageBoxButton.OK);
```
</div>

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
10
</div>

# 演習②: CT情報の取得・表示

💡MessageBox.Showを用いた取得情報の表示　{.text-5.5xl} 
コード全体表示Ver.

<div class="grid grid-cols-2 gap-4">

<div>

```csharp 
    string msg2 = string.Format(@"
    PatientName: {0}
    Patient ID: {1}
    Course ID: {2}
    Plan ID: {3}

    *Dose Information:
    Dose Per Fraction: {4}
    Number Of Fractions: {5}
    Target Structure: {6}
    Plan Normalization: {7}
    Algorithm: {8}
    Grid Size X: {9:F2} mm
    Grid Size Y: {10:F2} mm
    Grid Size Z: {11:F2} mm
        
```

</div> <div>

```csharp
    *CT Information
    Image ID: {12}
    Study ID: {13}
    Study Name: {14}
    Series ID: {15}
    Series Name: {16}
    CT device ID: {17}
    Creation Date: {18}
    X Voxel Size: {19:F2} mm
    Y Voxel Size: {20:F2} mm
    Z Voxel Size: {21:F2} mm",
    patientname, patientid, courseid, planid,
    doseperfraction, fractions, target, normalization, algorithm,
    grid_x, grid_y, grid_z,
    image_id, study_id, study_name, series_id, series_name,
    CTdeviceid, creationdate, x_res, y_res, z_res);
  
    MessageBox.Show(msg2, "Practice 2", MessageBoxButton.OK);

```
</div> </div>

<style>
code, pre {
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
}
</style>
---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
11
</div>

# 例題③: 線量計算アルゴリズムの選択ミス検出

🎯線量計算アルゴリズム選択間違いをしているときに警告メッセージを表示 {.text-2xl} 

✅ ヒント：施設プロトコルで想定する既定値と実際の値を比較  
✅ ヒント：`if文`の条件分岐により文字列を比較する

```csharp
    //Example-3
    string default_algorithm = "XXXXXX";

    // ・関係演算子 
    // 'A==B': AとBが等しい場合にtrueを返す.
    // 'A!=B' AとBが異なる場合にtrueを返す.

    if (default_algorithm != algorithm)//既定値とプランの設定値が異なる場合にif{}の内部を実行
    {
        string msg_algorithm = "Incorrect Algorithm is selected.: " + algorithm;
        MessageBox.Show(msg_algorithm, "Example 3", MessageBoxButton.OK);
    }
    else
    {
        //MessageBox.Show("Correct Algorithm is selected.: " + algorithm);
    }
    
```

<style>
code, pre {
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
}
</style>

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
12
</div>

# 演習③: CT装置の選択ミス検出

🎯CT装置の選択間違いをしているときに警告メッセージを表示してください {.text-2xl}

✅ ヒント：施設プロトコルで想定する既定値と実際の値を比較  
✅ ヒント：`if文`の条件分岐により文字列を比較する

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
13
</div>

# 演習③: CT装置の選択ミス検出

🎯CT装置の選択間違いをしているときに警告メッセージを表示してください {.text-2xl}

✅ ヒント：施設プロトコルで想定する既定値と実際の値を比較  
✅ ヒント：`if文`の条件分岐により文字列を比較する

```csharp
    //Practice 3: コード例
    string default_CT_Device = "XXXXXX";// 施設既定値を事前に設定

    // ・関係演算子 
    // 'A==B': AとBが等しい場合にtrueを返す.
    // 'A!=B' AとBが異なる場合にtrueを返す.

    if (default_CT_Device != CTdeviceid)  //既定値とプランの設定値が異なる場合にif{}の内部を実行
    {
        string msg_ct_device = "Incorrect CT device is selected.: " + CTdeviceid;
        MessageBox.Show(msg_ct_device, "Practice 3", MessageBoxButton.OK);
    }
    else
    {
    }
```

<style>
code, pre {
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
}
</style>

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
14
</div>

# 例題&演習③: 改良コード例  


💡 可読性の向上，可視化の工夫  <br>  💡 エラーカウント機能の追加 {.text-1xl}
   
```csharp

    string default_algorithm = "XXXXX";
    string default_CT_Device = "XXXXX";

    string err_msg = "Error; Please verify below parameters.\n";
    int err_count = 0;

    if (default_algorithm != algorithm){
        err_msg = err_msg + "Incorrect Calculation Algorithm is selected.: " + algorithm + "\n";
        err_count++;}//出したエラー数をカウント. err_count = err_count+1と同じ処理を意味する
    
    if (default_CT_Device != CTdeviceid){
        err_msg = err_msg + "Incorrect CT device is selected.: " + CTdeviceid + "\n";
        err_count++;}//検出したエラー数をカウント

    //検出したエラー内容とエラー数をまとめて表示
    if (err_count >= 1) {
        err_msg += "Number of detected errors: " + err_count.ToString();
        MessageBox.Show(err_msg, "Error", MessageBoxButton.OK, MessageBoxImage.Error);}

```

<style>
code, pre {
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
}
</style>

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
15
</div>

# 例題④: ビーム情報の取得・表示


<p class="text-5.5xl">
🎯すべてのビームの<u>ID</u>, <u>Name</u>, <u>装置名エネルギー線量率</u>, <u>照射方法</u>, <u>MLCタイプ</u>, <u>MU</u>, <u>ToleranceTable</u>を表示
</p>

✅ ヒント：`Beams`は`Beam`オブジェクトの集合 `IEnumerable<Beam>`  
✅ ヒント：`foreach文`：反復処理で各ビーム(`Beam`オブジェクト)から主要プロパティを取得・表示


```csharp
    //Example-4
    string msg_beams = "*Beam parameters\nID/Name/Linac/Energy/DoseRate/Technique/MLC/MU/ToleranceTable\n";
    IEnumerable<Beam> beams = plan.Beams;

    foreach (Beam beam in beams){
        string beam_name = beam.Name;
        string beam_id = beam.Id;
        string linac = beam.TreatmentUnit.Id;
        string energy = beam.EnergyModeDisplayName;
        string doserate = beam.DoseRate.ToString();
        string technique = beam.Technique.Id;
        string mlc = beam.MLCPlanType.ToString();
        string mu = beam.Meterset.Value.ToString("F1");
        string tol = beam.ToleranceTableLabel;

        string msg_temp = beam_id+" / "+beam_name+" / "+linac+" / "+energy+" / "+doserate 
                        +" / " +technique+ " / " +mlc+ " / " +mu+ " MU / "+tol + "\n";
        msg_beams += msg_temp;}
    MessageBox.Show(msg_beams, "Beam properties", MessageBoxButton.OK);

```

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
16
</div>

# 演習④: ストラクチャー情報の取得・表示
<p class="text-5.5xl">
🎯すべてのストラクチャーの<u>ID</u>, <u>DicomType</u>, <u>Volume</u>, <u>パーツ数</u>, <u>CT値オーバーライド</u>を表示してみましょう
</p>

✅ ヒント：`Structures` は`Structure`オブジェクトの集合`IEnumerable<Structure>`  
✅ ヒント：`foreach文`：反復処理で各ストラクチャー (`Structure`オブジェクト) の主要プロパティを表示  
✅ ヒント：`GetNumberOfSeparateParts()`：ストラクチャーのパーツ数を出力するメソッド  
✅ ヒント：`GetAssignedHU(out double)`：ストラクチャーに割り当てられた<b>CT値</b>を取得するメソッド

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
17
</div>

# 演習④: ストラクチャー情報の取得・表示
<p class="text-5.5xl">
🎯すべてのストラクチャーの<u>ID</u>, <u>DicomType</u>, <u>Volume</u>, <u>パーツ数</u>, <u>CT値オーバーライド</u>を表示してみましょう
</p>

```csharp

    //Practice-4: コード例
    string msg_ss = "*Structure parameters\nID / Type / Volume [cc] / NumberOfParts / Assigned HU\n";
    IEnumerable<Structure> structures = ss.Structures; //IEnumerableの読み方: アイ イニューメラブル

    foreach (Structure structure in structures){
        string structure_id = structure.Id;
        string structure_type = structure.DicomType;
        string vol = structure.Volume.ToString("F1");
        int NumParts = structure.GetNumberOfSeparateParts();
        string NumPartsStr = NumParts.ToString();

        bool huOK = false;
        string structure_hu = "N/A";
        double hu;
        huOK = structure.GetAssignedHU(out hu);//CT値がオーバーライドされている場合はhuに値が格納され、戻り値(huOK)にtrueが返る
        if (huOK){
            structure_hu = hu.ToString("F0") + " HU";
        }
        string msg_temp = structure_id+" / "+structure_type+" / "+vol+" cc / "+NumPartsStr+" / "+structure_hu+"\n";
        msg_ss += msg_temp;
    }
    MessageBox.Show(msg_ss, "Structure properties", MessageBoxButton.OK);
```


---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
18
</div>

# 例題⑤: LINQによる効率的なデータアクセス <br> -セットアップフィールドの抽出・Total MUの計算-
🎯LINQ(`Where`/`Select`/`Sum`)を使ってセットアップフィールドのID検出・Total MUを算出 {.text-5.5xl}

✅ ヒント：`Beams` は`Beam`の集合(コレクション) `IEnumerable<Beam>`　→　`LINQ`が使える  
✅ ヒント：そのフィールドがセットアップフィールドかどうかは`beam.IsSetupField`で判別可能

```csharp
    //Example-5
    // セットアップフィールドのIDの集合を抽出
    var setup_Ids = beams.Where(beam => beam.IsSetupField).Select(x => x.Id);
    // NOTE: IsSetupField == true はSetupフィールド
    msg_beams += "\nSetup Field: ";

    foreach (string setup_Id in setup_Ids){
        msg_beams += setup_Id + ", ";
    }

    // MU合計を算出
    double totalMU = beams.Where(beam => !beam.IsSetupField).Sum(beam => beam.Meterset.Value);

    msg_beams += "\nTotal MU: " + totalMU.ToString("F1");
    MessageBox.Show(msg_beams, "Beam properties", MessageBoxButton.OK);

```

<style>
code, pre {
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
}
</style>

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
19
</div>

# 演習⑤: LINQによる効率的なデータアクセス<br>-ストラクチャー情報の取得・表示-

🎯LINQ(`Where`/`Select`)を使って<b>SUPPORT</b>ストラクチャーを検出してください (Couchの設定確認)

✅ヒント：`StructureSet`は`Structure`の集合(コレクション)`IEnumerable<Structure>`→`LINQ`が使える  
✅ヒント：LINQ(`Where`/`Select`)を使って`DicomType`が<b>SUPPORT</b>のストラクチャーを検出・表示

---

<div class="absolute bottom-130 right-0 p-2 text-sm opacity-80">
20
</div>

# 演習⑤: LINQによる効率的なデータアクセス<br>-ストラクチャー情報の取得・表示-

🎯LINQ(`Where`/`Select`)を使って<b>SUPPORT</b>ストラクチャーを検出してください (Couchの設定確認)

✅ヒント：`StructureSet`は`Structure`の集合(コレクション)`IEnumerable<Structure>`→`LINQ`が使える
✅ヒント：LINQ(`Where`/`Select`)を使って`DicomType`が<b>SUPPORT</b>のストラクチャーを検出・表示


```csharp
    //Practice-5: コード例
    var support_Ids = structures.Where(structure => (structure.DicomType == "SUPPORT")).Select(x => x.Id);
    // NOTE: DicomType == "SUPPORT" は Couch 等のストラクチャー

    msg_ss += "\nSupport Structure: ";

    foreach (string support_Id in support_Ids)
    {
        msg_ss += support_Id + ", ";
    }

    MessageBox.Show(msg_ss, "Structure properties", MessageBoxButton.OK);
```

<style>
code, pre {
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
}
</style>

---
layout: end
---