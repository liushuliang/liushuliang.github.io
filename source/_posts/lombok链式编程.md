---
title: lombok编程
date: 2025-02-19 11:27:01
categories: Java基础知识
---

# lombok链式编程；可以一直点set方法

```java
new PatientPacsApplyPO()
                .setPatientIdent(patientIdent)
                .setHospitalNumber(hospitalNumber)
                .setGender(gender)
                .setPatientName(patientName);
```

要实现上述代码可以添加注解`@Accessors(chain = true)`
